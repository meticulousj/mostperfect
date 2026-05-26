import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const PROGRESS_KEY = "mostperfect-progress";
const REFLECTIONS_KEY = "mostperfect-reflections";
const NARRATION_KEY = "mostperfect-narration";

interface ProgressBlob {
  completedChapters: string[];
  lastReadChapter: string | null;
  startedAt: string | null;
}
interface NarrationBlob {
  listened: Record<string, number>;
}

const readLocal = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  return fallback;
};

const writeLocal = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const mergeProgress = (local: ProgressBlob, cloud: ProgressBlob): ProgressBlob => ({
  completedChapters: Array.from(
    new Set([...(local.completedChapters || []), ...(cloud.completedChapters || [])])
  ),
  lastReadChapter: local.lastReadChapter || cloud.lastReadChapter || null,
  startedAt:
    local.startedAt && cloud.startedAt
      ? local.startedAt < cloud.startedAt
        ? local.startedAt
        : cloud.startedAt
      : local.startedAt || cloud.startedAt || null,
});

const mergeReflections = (
  local: Record<string, string>,
  cloud: Record<string, string>
): Record<string, string> => {
  const out: Record<string, string> = { ...cloud };
  for (const [k, v] of Object.entries(local)) {
    if (v && v.length >= (out[k]?.length ?? 0)) out[k] = v;
  }
  return out;
};

const mergeNarration = (local: NarrationBlob, cloud: NarrationBlob): NarrationBlob => {
  const listened = { ...(cloud.listened || {}) };
  for (const [k, v] of Object.entries(local.listened || {})) {
    listened[k] = Math.max(listened[k] ?? 0, v);
  }
  return { listened };
};

export const CLOUD_HYDRATE_EVENT = "mostperfect:cloud-hydrate";
export const PROGRESS_CHANGED_EVENT = "mostperfect:progress-changed";

export const useCloudSync = () => {
  const { user } = useAuth();
  const userIdRef = useRef<string | null>(null);
  const debounceRef = useRef<number | null>(null);
  const initialMergedRef = useRef(false);

  // On auth change: merge local + cloud, write merged to both
  useEffect(() => {
    const uid = user?.id ?? null;
    if (uid === userIdRef.current) return;
    userIdRef.current = uid;
    initialMergedRef.current = false;

    if (!uid) return;

    (async () => {
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", uid)
        .maybeSingle();

      if (error) {
        console.error("[cloud-sync] fetch error", error);
        return;
      }

      const localProgress = readLocal<ProgressBlob>(PROGRESS_KEY, {
        completedChapters: [],
        lastReadChapter: null,
        startedAt: null,
      });
      const localReflections = readLocal<Record<string, string>>(REFLECTIONS_KEY, {});
      const localNarration = readLocal<NarrationBlob>(NARRATION_KEY, { listened: {} });

      const cloudProgress: ProgressBlob = {
        completedChapters: data?.completed_chapters ?? [],
        lastReadChapter: data?.last_read_chapter ?? null,
        startedAt: data?.started_at ?? null,
      };
      const cloudReflections = (data?.reflections ?? {}) as Record<string, string>;
      const cloudNarration: NarrationBlob = {
        listened: (data?.narration as { listened?: Record<string, number> })?.listened ?? {},
      };

      const mergedProgress = mergeProgress(localProgress, cloudProgress);
      const mergedReflections = mergeReflections(localReflections, cloudReflections);
      const mergedNarration = mergeNarration(localNarration, cloudNarration);

      writeLocal(PROGRESS_KEY, mergedProgress);
      writeLocal(REFLECTIONS_KEY, mergedReflections);
      writeLocal(NARRATION_KEY, mergedNarration);

      // Notify hooks to re-read
      window.dispatchEvent(new Event(CLOUD_HYDRATE_EVENT));

      // Push merged back to cloud
      await supabase.from("user_progress").upsert({
        user_id: uid,
        completed_chapters: mergedProgress.completedChapters,
        last_read_chapter: mergedProgress.lastReadChapter,
        started_at: mergedProgress.startedAt,
        reflections: mergedReflections,
        narration: { listened: mergedNarration.listened },
      });

      initialMergedRef.current = true;
    })();
  }, [user]);

  // Push to cloud whenever local progress changes (debounced)
  useEffect(() => {
    const handler = () => {
      const uid = userIdRef.current;
      if (!uid || !initialMergedRef.current) return;
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(async () => {
        const progress = readLocal<ProgressBlob>(PROGRESS_KEY, {
          completedChapters: [],
          lastReadChapter: null,
          startedAt: null,
        });
        const reflections = readLocal<Record<string, string>>(REFLECTIONS_KEY, {});
        const narration = readLocal<NarrationBlob>(NARRATION_KEY, { listened: {} });

        const { error } = await supabase.from("user_progress").upsert({
          user_id: uid,
          completed_chapters: progress.completedChapters,
          last_read_chapter: progress.lastReadChapter,
          started_at: progress.startedAt,
          reflections,
          narration: { listened: narration.listened },
        });
        if (error) console.error("[cloud-sync] upsert error", error);
      }, 800);
    };
    window.addEventListener(PROGRESS_CHANGED_EVENT, handler);
    return () => window.removeEventListener(PROGRESS_CHANGED_EVENT, handler);
  }, []);
};
