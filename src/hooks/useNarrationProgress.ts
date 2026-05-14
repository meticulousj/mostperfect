import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mostperfect-narration";

interface NarrationData {
  // chapterId -> percent listened (0-100, highest reached)
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
};

export const useNarrationProgress = () => {
  const [data, setData] = useState<NarrationData>(getStored);

  useEffect(() => {
    save(data);
  }, [data]);

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
