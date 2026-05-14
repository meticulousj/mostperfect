import { useEffect, useMemo, useRef, useState } from "react";
import { Headphones, Loader2, Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNarrationProgress } from "@/hooks/useNarrationProgress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ChapterNarrationProps {
  chapterId: string;
  title: string;
  paragraphs: string[];
  keyQuote?: string;
  onMostlyListened?: () => void;
}

const RATE_OPTIONS = [0.85, 1, 1.15, 1.35, 1.6];
const COMPLETE_THRESHOLD = 90;

const VOICES = [
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah (warm)" },
  { id: "JBFqnCBsd6RMkjVDRZzb", name: "George (rich)" },
  { id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte (calm)" },
  { id: "nPczCjzI2devNBz1zQrb", name: "Brian (deep)" },
  { id: "SAz9YHcvj6GT2YYXdXww", name: "River (neutral)" },
];

const ChapterNarration = ({
  chapterId,
  title,
  paragraphs,
  keyQuote,
  onMostlyListened,
}: ChapterNarrationProps) => {
  const { getListened, updateListened, getPosition, updatePosition } = useNarrationProgress();

  const fullText = useMemo(() => {
    const parts = [title];
    if (keyQuote) parts.push(`"${keyQuote}"`);
    parts.push(...paragraphs);
    return parts.filter((s) => s && s.trim().length > 0).join("\n\n");
  }, [title, keyQuote, paragraphs]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const completeFiredRef = useRef(false);

  const [voiceId, setVoiceId] = useState(VOICES[0].id);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rateIdx, setRateIdx] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const listenedPct = getListened(chapterId);

  // Reset on chapter/voice change
  useEffect(() => {
    completeFiredRef.current = false;
    setAudioUrl(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [chapterId, voiceId]);

  const ensureAudio = async (): Promise<string | null> => {
    if (audioUrl) return audioUrl;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("narrate-chapter", {
        body: { chapterId, text: fullText, voiceId },
      });
      if (error) throw error;
      if (!data?.url) throw new Error("No audio URL returned");
      setAudioUrl(data.url);
      return data.url as string;
    } catch (e) {
      toast({
        title: "Couldn't generate narration",
        description: (e as Error).message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = async () => {
    const url = await ensureAudio();
    if (!url) return;

    if (!audioRef.current) {
      const a = new Audio(url);
      a.playbackRate = RATE_OPTIONS[rateIdx];
      a.addEventListener("timeupdate", () => {
        setCurrentTime(a.currentTime);
        if (a.duration > 0) {
          const pct = (a.currentTime / a.duration) * 100;
          updateListened(chapterId, pct);
          if (!completeFiredRef.current && pct >= COMPLETE_THRESHOLD) {
            completeFiredRef.current = true;
            onMostlyListened?.();
          }
        }
      });
      a.addEventListener("loadedmetadata", () => setDuration(a.duration));
      a.addEventListener("ended", () => setIsPlaying(false));
      a.addEventListener("pause", () => setIsPlaying(false));
      a.addEventListener("play", () => setIsPlaying(true));
      audioRef.current = a;
    }
    audioRef.current.playbackRate = RATE_OPTIONS[rateIdx];
    await audioRef.current.play();
  };

  const handlePause = () => audioRef.current?.pause();

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds),
    );
  };

  const cycleRate = () => {
    const next = (rateIdx + 1) % RATE_OPTIONS.length;
    setRateIdx(next);
    if (audioRef.current) audioRef.current.playbackRate = RATE_OPTIONS[next];
  };

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const livePct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displayPct = Math.max(listenedPct, livePct);

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

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

      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${displayPct}%` }}
        />
      </div>
      <div className="mb-5 flex justify-between text-xs text-muted-foreground">
        <span>{fmt(currentTime)}</span>
        <span>{duration > 0 ? fmt(duration) : "—"}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => skip(-15)} aria-label="Back 15s" disabled={!audioRef.current}>
          <SkipBack className="h-4 w-4" />
        </Button>

        {isPlaying ? (
          <Button onClick={handlePause} size="lg" className="gap-2">
            <Pause className="h-4 w-4" /> Pause
          </Button>
        ) : (
          <Button onClick={handlePlay} size="lg" className="gap-2" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Preparing audio…
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                {currentTime > 0 ? "Resume" : "Play"}
              </>
            )}
          </Button>
        )}

        <Button variant="ghost" size="icon" onClick={() => skip(15)} aria-label="Forward 15s" disabled={!audioRef.current}>
          <SkipForward className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="sm" onClick={cycleRate} className="ml-1">
          {RATE_OPTIONS[rateIdx]}×
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRestart}
          disabled={!audioRef.current || currentTime === 0}
          className="gap-1"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Restart
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Volume2 className="h-3.5 w-3.5 text-muted-foreground" />
        <select
          value={voiceId}
          onChange={(e) => setVoiceId(e.target.value)}
          className="max-w-full truncate rounded-md border bg-background px-2 py-1 text-xs text-foreground"
        >
          {VOICES.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        High-quality narration powered by ElevenLabs. The first play generates the audio (a few
        seconds); subsequent plays stream the cached file. Chapter is marked complete automatically
        once you've listened to {COMPLETE_THRESHOLD}%.
      </p>
    </section>
  );
};

export default ChapterNarration;
