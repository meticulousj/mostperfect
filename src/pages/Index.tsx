import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/useProgress";
import { bookParts, PROLOGUE } from "@/data/bookContent";

const Index = () => {
  const { overallPercentage, completedCount, totalChapters, progress } = useProgress();
  const hasStarted = progress.startedAt !== null;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-background">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              Interactive Guide
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Most Perfect
            </h1>
            <p className="mt-2 font-serif text-xl text-muted-foreground sm:text-2xl">
              Above Human, Proven and Verified
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {PROLOGUE.content[0]} {PROLOGUE.content[1]}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to={hasStarted && progress.lastReadChapter ? `/read/${progress.lastReadChapter}` : "/read/prologue"}>
                  {hasStarted ? "Continue Reading" : "Begin Your Journey"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <a href="https://books2read.com/b/bOMDpK" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-4 w-4" />
                  Get the Book
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <a href="https://www.barnesandnoble.com/w/most-perfect-jessica-butler/1148826487?ean=2940185038208" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-4 w-4" />
                  Barnes &amp; Noble
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/course">View Course Map</Link>
              </Button>
            </div>

            {hasStarted && (
              <div className="mt-8 max-w-sm">
                <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Overall Progress</span>
                  <span>{completedCount} / {totalChapters} chapters</span>
                </div>
                <Progress value={overallPercentage} className="h-2" />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Parts overview */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          Your Journey in Six Parts
        </h2>
        <p className="mt-2 text-muted-foreground">
          29 chapters across 6 parts — from foundations to lived practice.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookParts.map((part, i) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                to="/course"
                className="group flex h-full flex-col rounded-lg border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Part {part.number}
                </span>
                <h3 className="mt-1 font-serif text-lg font-semibold text-card-foreground">
                  {part.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{part.subtitle}</p>
                <div className="mt-auto flex items-center gap-1 pt-4 text-xs font-medium text-muted-foreground group-hover:text-primary">
                  <BookOpen className="h-3.5 w-3.5" />
                  {part.chapters.length} chapters
                  <ChevronRight className="ml-auto h-3.5 w-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key quote */}
      <section className="border-t bg-accent/30">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <blockquote className="font-serif text-xl italic leading-relaxed text-foreground sm:text-2xl">
            "You are not being asked to be flawless. You are being asked to rise."
          </blockquote>
          <p className="mt-4 text-sm text-muted-foreground">— From the Prologue</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
