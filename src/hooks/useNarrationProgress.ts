import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mostperfect-narration";

interface NarrationData {
  // chapterId -> percent listened (0-100, highest reached)
  listened: Record<string, number>;
  // chapterId -> last playback position in seconds (for resume)
  position: Record<string, number>;
}

const getStored = (): NarrationData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { listened: parsed.listened ?? {}, position: parsed.position ?? {} };
    }
  } catch {}
  return { listened: {}, position: {} };
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

  const getPosition = useCallback(
    (chapterId: string) => data.position[chapterId] ?? 0,
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

  const updatePosition = useCallback((chapterId: string, seconds: number) => {
    setData((prev) => ({
      ...prev,
      position: { ...prev.position, [chapterId]: Math.max(0, seconds) },
    }));
  }, []);

  const resetChapter = useCallback((chapterId: string) => {
    setData((prev) => {
      const { [chapterId]: _l, ...listened } = prev.listened;
      const { [chapterId]: _p, ...position } = prev.position;
      return { listened, position };
    });
  }, []);

  return { getListened, getPosition, updateListened, updatePosition, resetChapter };
};
