import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/useProgress";
import { bookParts, allChapters } from "@/data/bookContent";

const ProgressDashboard = () => {
  const { overallPercentage, completedCount, totalChapters, getPartProgress, progress, isCompleted, resetProgress } = useProgress();

  const continueChapter = progress.lastReadChapter || "prologue";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-3xl font-bold text-foreground">Your Progress</h1>
        <p className="mt-2 text-muted-foreground">Track your journey through the book.</p>
      </motion.div>

      {/* Overall */}
      <div className="mt-8 rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Overall Completion</p>
            <p className="mt-1 font-serif text-3xl font-bold text-foreground">{overallPercentage}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Chapters</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{completedCount}<span className="text-muted-foreground text-base">/{totalChapters}</span></p>
          </div>
        </div>
        <Progress value={overallPercentage} className="mt-4 h-3" />

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="gap-2">
            <Link to={`/read/${continueChapter}`}>
              Continue Reading <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          {completedCount > 0 && (
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={resetProgress}>
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
          )}
        </div>
      </div>

      {/* Per Part */}
      <div className="mt-8 space-y-4">
        {bookParts.map((part) => {
          const pp = getPartProgress(part.chapters.map(c => c.id));
          return (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {part.number}
                  </span>
                  <div>
                    <p className="font-serif font-semibold text-foreground">{part.title}</p>
                    <p className="text-xs text-muted-foreground">{part.subtitle}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {pp.completed}/{pp.total}
                </span>
              </div>
              <Progress value={pp.percentage} className="mt-3 h-2" />
            </motion.div>
          );
        })}
      </div>

      {/* Remaining chapters */}
      {completedCount < totalChapters && (
        <div className="mt-8">
          <h2 className="font-serif text-xl font-semibold text-foreground">Up Next</h2>
          <div className="mt-3 space-y-2">
            {allChapters
              .filter(ch => !isCompleted(ch.id))
              .slice(0, 5)
              .map(ch => (
                <Link
                  key={ch.id}
                  to={`/read/${ch.id}`}
                  className="flex items-center gap-3 rounded-md border px-4 py-3 text-sm transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{ch.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{ch.description}</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressDashboard;
