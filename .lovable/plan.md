## Switch chapter narration to ElevenLabs

Replace the browser SpeechSynthesis narration with high-quality ElevenLabs TTS, served through a secure edge function and cached so the same chapter doesn't re-bill on every play.

### How it will work

1. **Edge function `narrate-chapter`** (Lovable Cloud)
   - Accepts `{ chapterId, text, voiceId? }`
   - Calls ElevenLabs `/v1/text-to-speech/{voiceId}?output_format=mp3_44100_128` with `eleven_multilingual_v2`
   - Caches the resulting MP3 in a public Storage bucket `chapter-audio` at `{chapterId}-{voiceId}.mp3`
   - Returns `{ url }` to the cached file (subsequent calls skip ElevenLabs and return the existing URL)
   - Uses the existing `ELEVENLABS_API_KEY` secret (will be requested if missing)

2. **Storage bucket `chapter-audio`** (public read, service-role write) created via migration

3. **Rewritten `ChapterNarration.tsx`**
   - Uses a single `<audio>` element instead of `speechSynthesis`
   - On first Play: shows "Preparing audio…", calls the edge function, then loads & plays the returned MP3
   - Real progress bar driven by `audio.currentTime / audio.duration`
   - Play / Pause / Restart / 15s skip back / 15s skip forward
   - Playback speed picker (0.85× / 1× / 1.15× / 1.35× / 1.6×) via `audio.playbackRate`
   - Voice picker with 4–5 curated ElevenLabs voices (Sarah, George, Charlotte, Brian, River)
   - Auto-marks chapter complete at 90% listened (unchanged behavior)
   - Resume from last position via existing `useNarrationProgress` hook (stores % per chapter)

### Files

- **New** `supabase/functions/narrate-chapter/index.ts` — TTS + caching
- **New** migration — create public `chapter-audio` storage bucket + RLS
- **Edit** `src/components/ChapterNarration.tsx` — swap engine, keep API/props identical so `ChapterReader.tsx` needs no changes
- **Edit** `src/hooks/useNarrationProgress.ts` — (optional) also store last seconds for resume

### Secret

`ELEVENLABS_API_KEY` — I'll request it via the secrets tool before deploying the function if it isn't already set.

### Cost note

Each chapter is generated **once** per voice and then served from Storage forever, so ongoing cost is just bandwidth. ~29 chapters × ~5 min × 1 voice ≈ a one-time ~150k characters on ElevenLabs.
