import { useState, useCallback, useEffect } from "react";
import { allChapters } from "@/data/bookContent";

const STORAGE_KEY = "mostperfect-progress";

interface ProgressData {
  completedChapters: string[];
  lastReadChapter: string | null;
  startedAt: string | null;
}

const getStoredProgress = (): ProgressData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return { completedChapters: [], lastReadChapter: null, startedAt: null };
};

const saveProgress = (data: ProgressData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressData>(getStoredProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const toggleChapter = useCallback((chapterId: string) => {
    setProgress((prev) => {
      const completed = prev.completedChapters.includes(chapterId)
        ? prev.completedChapters.filter((id) => id !== chapterId)
        : [...prev.completedChapters, chapterId];
      return { ...prev, completedChapters: completed };
    });
  }, []);

  const markChapterRead = useCallback((chapterId: string) => {
    setProgress((prev) => ({
      ...prev,
      lastReadChapter: chapterId,
      startedAt: prev.startedAt || new Date().toISOString(),
    }));
  }, []);

  const isCompleted = useCallback(
    (chapterId: string) => progress.completedChapters.includes(chapterId),
    [progress.completedChapters]
  );

  const totalChapters = allChapters.length;
  const completedCount = progress.completedChapters.length;
  const overallPercentage = Math.round((completedCount / totalChapters) * 100);

  const getPartProgress = useCallback(
    (chapterIds: string[]) => {
      const completed = chapterIds.filter((id) =>
        progress.completedChapters.includes(id)
      ).length;
      return { completed, total: chapterIds.length, percentage: Math.round((completed / chapterIds.length) * 100) };
    },
    [progress.completedChapters]
  );

  const resetProgress = useCallback(() => {
    setProgress({ completedChapters: [], lastReadChapter: null, startedAt: null });
  }, []);

  return {
    progress,
    toggleChapter,
    markChapterRead,
    isCompleted,
    totalChapters,
    completedCount,
    overallPercentage,
    getPartProgress,
    resetProgress,
  };
};
