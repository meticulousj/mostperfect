import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, BookOpen, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/useProgress";
import { getChapterById, getNextChapter, getPreviousChapter, getPartForChapter } from "@/data/bookContent";
import { cn } from "@/lib/utils";

const ChapterReader = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { isCompleted, toggleChapter, markChapterRead } = useProgress();

  const chapter = getChapterById(chapterId || "");
  const next = getNextChapter(chapterId || "");
  const prev = getPreviousChapter(chapterId || "");
  const part = getPartForChapter(chapterId || "");

  useEffect(() => {
    if (chapterId) markChapterRead(chapterId);
    window.scrollTo(0, 0);
  }, [chapterId, markChapterRead]);

  if (!chapter) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold">Chapter Not Found</h1>
        <p className="mt-2 text-muted-foreground">The chapter you're looking for doesn't exist.</p>
        <Button asChild className="mt-6">
          <Link to="/course">Back to Course</Link>
        </Button>
      </div>
    );
  }

  const completed = isCompleted(chapter.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <motion.div
        key={chapter.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/course" className="hover:text-foreground transition-colors">Course</Link>
          <span>/</span>
          {part && (
            <>
              <span>Part {part.number}</span>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">
            {typeof chapter.number === "number" ? `Chapter ${chapter.number}` : chapter.number}
          </span>
        </div>

        {/* Header */}
        <header className="mb-10">
          {part && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
              Part {part.number} — {part.title}
            </p>
          )}
          {chapter.isMiniChapter && (
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Mini Chapter
            </span>
          )}
          <h1 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {chapter.title}
          </h1>
          <p className="mt-3 text-muted-foreground">{chapter.description}</p>
        </header>

        {/* Key Quote */}
        {chapter.keyQuote && (
          <blockquote className="mb-10 rounded-lg border-l-4 border-primary bg-accent/40 px-6 py-4">
            <p className="font-serif text-base italic leading-relaxed text-foreground">
              "{chapter.keyQuote}"
            </p>
          </blockquote>
        )}

        {/* Content */}
        <article className="space-y-5">
          {chapter.content.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Mark Complete */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-lg border bg-card p-6">
          <Button
            onClick={() => toggleChapter(chapter.id)}
            variant={completed ? "outline" : "default"}
            size="lg"
            className="gap-2"
          >
            <Check className={cn("h-4 w-4", completed && "text-success")} />
            {completed ? "Completed ✓" : "Mark as Complete"}
          </Button>
          {completed && (
            <p className="text-sm text-muted-foreground">
              Great work! You've completed this chapter.
            </p>
          )}
        </div>

        {/* Get the Book CTA */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href="https://a.co/d/c7pVxkb" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Amazon
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href="https://books2read.com/b/bOMDpK" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Books2Read
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href="https://www.barnesandnoble.com/w/most-perfect-jessica-butler/1148826487?ean=2940185038208" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Barnes &amp; Noble
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href="https://ocebook.com/book/197273/most-perfect-above-human-proven-and-verified-claim-your-ultimate-standard" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              OceBook
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href="https://freethinkinggenius.substack.com/s/thestandard" target="_blank" rel="noopener noreferrer">
              <Mail className="h-4 w-4" />
              The Standard
            </a>
          </Button>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {prev ? (
            <Button asChild variant="ghost" className="gap-2">
              <Link to={`/read/${prev.id}`}>
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{prev.title}</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            </Button>
          ) : (
            <div />
          )}
          {next ? (
            <Button asChild variant="ghost" className="gap-2">
              <Link to={`/read/${next.id}`}>
                <span className="hidden sm:inline">{next.title}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="default" className="gap-2">
              <Link to="/progress">
                View Your Progress
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ChapterReader;
