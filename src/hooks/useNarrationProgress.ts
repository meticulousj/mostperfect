import { useCallback, useEffect, useState } from "react";
import { CLOUD_HYDRATE_EVENT, PROGRESS_CHANGED_EVENT } from "@/hooks/useCloudSync";

const STORAGE_KEY = "mostperfect-narration";

interface NarrationData {
  listened: Record<string, number>;
}

const getStored = (): NarrationData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { listened: {} };
};

const save = (data: NarrationData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(PROGRESS_CHANGED_EVENT));
};

export const useNarrationProgress = () => {
  const [data, setData] = useState<NarrationData>(getStored);

  useEffect(() => {
    save(data);
  }, [data]);

  useEffect(() => {
    const handler = () => setData(getStored());
    window.addEventListener(CLOUD_HYDRATE_EVENT, handler);
    return () => window.removeEventListener(CLOUD_HYDRATE_EVENT, handler);
  }, []);

  const getListened = useCallback(
    (chapterId: string) => data.listened[chapterId] ?? 0,
    [data]
  );

  const updateListened = useCallback((chapterId: string, percent: number) => {
    setData((prev) => {
      const current = prev.listened[chapterId] ?? 0;
      const next = Math.max(current, Math.min(100, Math.round(percent)));
      if (next === current) return prev;
      return { ...prev, listened: { ...prev.listened, [chapterId]: next } };
    });
  }, []);

  const resetChapter = useCallback((chapterId: string) => {
    setData((prev) => {
      const { [chapterId]: _, ...rest } = prev.listened;
      return { ...prev, listened: rest };
    });
  }, []);

  return { getListened, updateListened, resetChapter };
};
