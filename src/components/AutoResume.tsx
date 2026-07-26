import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";
import { allChapters, PROLOGUE } from "@/data/bookContent";

const PROGRESS_KEY = "mostperfect-progress";
const PREFS_KEY = "mostperfect-onboarding-prefs";
const TOUR_KEY = "mostperfect-onboarded";
const SESSION_FLAG = "mostperfect-resumed-this-session";

type Prefs = { startId?: string; goal?: number; email?: string | null };

const paceLabel = (goal?: number) => {
  if (goal === 1) return "Casual pace · 1 chapter/week";
  if (goal === 3) return "Steady pace · 3 chapters/week";
  if (goal === 7) return "Immersed pace · 1 chapter/day";
  return null;
};

const findChapter = (id: string | null | undefined) => {
  if (!id) return null;
  if (id === PROLOGUE.id) return PROLOGUE;
  return allChapters.find((c) => c.id === id) ?? null;
};

const AutoResume = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_FLAG)) return;

      const progressRaw = localStorage.getItem(PROGRESS_KEY);
      const prefsRaw = localStorage.getItem(PREFS_KEY);
      const onboarded = localStorage.getItem(TOUR_KEY);

      const progress = progressRaw ? JSON.parse(progressRaw) : null;
      const prefs: Prefs = prefsRaw ? JSON.parse(prefsRaw) : {};

      // Only auto-resume after the welcome tour is completed
      if (!onboarded) return;

      // Determine target: last-read chapter wins; fall back to onboarding start choice
      const targetId: string | null =
        progress?.lastReadChapter ||
        (prefs.startId === "prologue" ? PROLOGUE.id : null) ||
        null;

      const chapter = findChapter(targetId);
      if (!chapter) return;

      sessionStorage.setItem(SESSION_FLAG, "1");

      let cancelled = false;
      const pace = paceLabel(prefs.goal);
      toast(`Resuming: ${chapter.title}`, {
        description: pace ?? "Picking up where you left off.",
        icon: <BookOpen className="h-4 w-4" />,
        action: {
          label: "Stay here",
          onClick: () => {
            cancelled = true;
          },
        },
      });

      const t = setTimeout(() => {
        if (!cancelled) navigate(`/read/${chapter.id}`);
      }, 1200);
      return () => clearTimeout(t);
    } catch {
      // ignore
    }
  }, [navigate]);

  return null;
};

export default AutoResume;
