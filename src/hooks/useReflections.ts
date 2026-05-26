import { useCallback, useEffect, useState } from "react";
import { CLOUD_HYDRATE_EVENT, PROGRESS_CHANGED_EVENT } from "@/hooks/useCloudSync";

const STORAGE_KEY = "mostperfect-reflections";

type ReflectionsMap = Record<string, string>;

const getStored = (): ReflectionsMap => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return {};
};

const save = (data: ReflectionsMap) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(PROGRESS_CHANGED_EVENT));
};

/**
 * Deterministic prompt picker so the same chapter always shows the same prompts.
 */
const REFLECTION_PROMPTS = [
  "Where in your life are you currently settling for less than your highest standard?",
  "What belief from this chapter challenged you most—and why?",
  "What is one specific action you can take in the next 24 hours to live this idea?",
  "Who would you become if you applied this consistently for 30 days?",
  "What fear or comfort is keeping you from rising right now?",
  "How does your current identity align (or conflict) with what was just described?",
  "What evidence in your life proves—or disproves—the standard in this chapter?",
  "What would the Above Human version of you do differently today?",
  "Where have you been mistaking comfort for alignment?",
  "What truth from this chapter do you most need to hear again tomorrow?",
  "What is one default pattern you are ready to retire?",
  "How will you measure whether you are actually living this, not just agreeing with it?",
];

export const getPromptsForChapter = (chapterId: string, count = 3): string[] => {
  let hash = 0;
  for (let i = 0; i < chapterId.length; i++) {
    hash = (hash * 31 + chapterId.charCodeAt(i)) >>> 0;
  }
  const prompts: string[] = [];
  const used = new Set<number>();
  for (let i = 0; i < count; i++) {
    let idx = (hash + i * 7) % REFLECTION_PROMPTS.length;
    while (used.has(idx)) idx = (idx + 1) % REFLECTION_PROMPTS.length;
    used.add(idx);
    prompts.push(REFLECTION_PROMPTS[idx]);
  }
  return prompts;
};

export const useReflections = () => {
  const [reflections, setReflections] = useState<ReflectionsMap>(getStored);

  useEffect(() => {
    save(reflections);
  }, [reflections]);

  const getReflection = useCallback(
    (key: string) => reflections[key] ?? "",
    [reflections]
  );

  const setReflection = useCallback((key: string, value: string) => {
    setReflections((prev) => {
      if (!value) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const getChapterReflectionCount = useCallback(
    (chapterId: string) => {
      return Object.keys(reflections).filter(
        (k) => k.startsWith(`${chapterId}::`) && reflections[k].trim().length > 0
      ).length;
    },
    [reflections]
  );

  const totalReflections = Object.values(reflections).filter(
    (v) => v.trim().length > 0
  ).length;

  return {
    reflections,
    getReflection,
    setReflection,
    getChapterReflectionCount,
    totalReflections,
  };
};
