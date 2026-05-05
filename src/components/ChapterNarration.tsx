import { useEffect, useMemo, useRef, useState } from "react";
import { Headphones, Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNarrationProgress } from "@/hooks/useNarrationProgress";

interface ChapterNarrationProps {
  chapterId: string;
  title: string;
  paragraphs: string[];
  keyQuote?: string;
  onMostlyListened?: () => void;
}

const RATE_OPTIONS = [0.85, 1, 1.15, 1.35, 1.6];
const COMPLETE_THRESHOLD = 90;

const ChapterNarration = ({
  chapterId,
  title,
  paragraphs,
  keyQuote,
  onMostlyListened,
}: ChapterNarrationProps) => {
  const { getListened, updateListened } = useNarrationProgress();

  const segments = useMemo(() => {
    const intro = [title];
    if (keyQuote) intro.push(keyQuote);
    return [...intro, ...paragraphs].filter((s) => s && s.trim().length > 0);
  }, [title, keyQuote, paragraphs]);

  const totalChars = useMemo(
    () => segments.reduce((sum, s) => sum + s.length, 0),
    [segments]
  );

  const segmentOffsets = useMemo(() => {
    const offsets: number[] = [];
    let acc = 0;
    for (const s of segments) {
      offsets.push(acc);
      acc += s.length;
    }
    return offsets;
  }, [segments]);

  const [supported, setSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rateIdx, setRateIdx] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string | null>(null);

  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const indexRef = useRef(0);
  const stoppedRef = useRef(false);
  const completeFiredRef = useRef(false);

  const listenedPct = getListened(chapterId);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const load = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);
      if (!voiceURI) {
        const preferred =
          list.find((v) => /en[-_]US/i.test(v.lang) && /female|samantha|google us/i.test(v.name)) ||
          list.find((v) => /^en/i.test(v.lang)) ||
          list[0];
        if (preferred) setVoiceURI(preferred.voiceURI);
      }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, [voiceURI]);

  useEffect(() => {
    completeFiredRef.current = false;
    return () => {
      stoppedRef.current = true;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [chapterId]);

  const computePercent = (segIdx: number, charOffset = 0) => {
    if (totalChars === 0) return 0;
    const base = segmentOffsets[segIdx] ?? 0;
    return Math.min(100, ((base + charOffset) / totalChars) * 100);
  };

  const reportProgress = (segIdx: number, charOffset = 0) => {
    const pct = computePercent(segIdx, charOffset);
    updateListened(chapterId, pct);
    if (!completeFiredRef.current && pct >= COMPLETE_THRESHOLD) {
      completeFiredRef.current = true;
      onMostlyListened?.();
    }
  };

  const speakFrom = (startIdx: number) => {
    if (!supported) return;
    stoppedRef.current = false;
    indexRef.current = startIdx;
    setCurrentIndex(startIdx);
    setIsPlaying(true);
    setIsPaused(false);
    window.speechSynthesis.cancel();
    queueNext();
  };

  const queueNext = () => {
    if (stoppedRef.current) return;
    const i = indexRef.current;
    if (i >= segments.length) {
      setIsPlaying(false);
      setIsPaused(false);
      reportProgress(segments.length - 1, segments[segments.length - 1]?.length ?? 0);
      return;
    }
    const u = new SpeechSynthesisUtterance(segments[i]);
    u.rate = RATE_OPTIONS[rateIdx];
    u.pitch = 1;
    const v = voices.find((vv) => vv.voiceURI === voiceURI);
    if (v) u.voice = v;
    u.onstart = () => reportProgress(i, 0);
    u.onboundary = (e) => {
      if (e.name === "word" || e.name === "sentence") {
        reportProgress(i, e.charIndex ?? 0);
      }
    };
    u.onend = () => {
      if (stoppedRef.current) return;
      reportProgress(i, segments[i].length);
      indexRef.current = i + 1;
      setCurrentIndex(indexRef.current);
      queueNext();
    };
    u.onerror = () => {
      if (stoppedRef.current) return;
      indexRef.current = i + 1;
      setCurrentIndex(indexRef.current);
      queueNext();
    };
    utterRef.current = u;
    window.speechSynthesis.speak(u);
  };

  const handlePlay = () => {
    if (!supported) return;
    if (isPaused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }
    speakFrom(currentIndex);
  };

  const handlePause = () => {
    if (!supported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (!supported) return;
    stoppedRef.current = true;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentIndex(0);
    indexRef.current = 0;
  };

  const skip = (delta: number) => {
    const next = Math.max(0, Math.min(segments.length - 1, currentIndex + delta));
    if (isPlaying || isPaused) {
      speakFrom(next);
    } else {
      setCurrentIndex(next);
      indexRef.current = next;
    }
  };

  const cycleRate = () => {
    const nextIdx = (rateIdx + 1) % RATE_OPTIONS.length;
    setRateIdx(nextIdx);
    if (isPlaying) {
      speakFrom(indexRef.current);
    }
  };

  if (!supported) {
    return (
      <section className="mt-10 rounded-lg border bg-card p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Headphones className="h-4 w-4" />
          Audio narration isn't supported in this browser. Try Chrome, Edge, or Safari.
        </div>
      </section>
    );
  }

  const livePct = computePercent(currentIndex, 0);
  const displayPct = Math.max(listenedPct, isPlaying || isPaused ? livePct : 0);

  return (
    <section className="mt-10 rounded-lg border bg-card p-6 sm:p-7">
      <header className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Headphones className="h-4 w-4 text-primary" />
          <h2 className="font-serif text-lg font-semibold text-foreground">
            Listen to this chapter
          </h2>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {Math.round(displayPct)}% listened
        </span>
      </header>

      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${displayPct}%` }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => skip(-1)} aria-label="Previous segment">
          <SkipBack className="h-4 w-4" />
        </Button>

        {isPlaying ? (
          <Button onClick={handlePause} size="lg" className="gap-2">
            <Pause className="h-4 w-4" /> Pause
          </Button>
        ) : (
          <Button onClick={handlePlay} size="lg" className="gap-2">
            <Play className="h-4 w-4" />
            {isPaused ? "Resume" : currentIndex > 0 ? "Continue" : "Play"}
          </Button>
        )}

        <Button variant="ghost" size="icon" onClick={() => skip(1)} aria-label="Next segment">
          <SkipForward className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="sm" onClick={cycleRate} className="ml-1">
          {RATE_OPTIONS[rateIdx]}×
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleStop}
          disabled={!isPlaying && !isPaused && currentIndex === 0}
          className="gap-1"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Restart
        </Button>

        <span className="ml-auto text-xs text-muted-foreground">
          Segment {Math.min(currentIndex + 1, segments.length)} / {segments.length}
        </span>
      </div>

      {voices.length > 0 && (
        <div className="mt-4 flex items-center gap-2">
          <Volume2 className="h-3.5 w-3.5 text-muted-foreground" />
          <select
            value={voiceURI ?? ""}
            onChange={(e) => setVoiceURI(e.target.value)}
            className="max-w-full truncate rounded-md border bg-background px-2 py-1 text-xs text-foreground"
          >
            {voices
              .filter((v) => /^en/i.test(v.lang))
              .map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
          </select>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Uses your browser's built-in voice. Chapter is marked complete automatically once you've
        listened to {COMPLETE_THRESHOLD}%.
      </p>

      <div className="hidden">
        <Slider value={[0]} max={100} />
      </div>
    </section>
  );
};

export default ChapterNarration;
