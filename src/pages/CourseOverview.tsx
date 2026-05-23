import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, BookOpen, Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/useProgress";
import { bookParts, PROLOGUE, EPILOGUE } from "@/data/bookContent";
import { cn } from "@/lib/utils";
import { openGlobalSearch } from "@/components/GlobalSearch";
import SEO from "@/components/SEO";

const CourseOverview = () => {
  const { isCompleted, getPartProgress } = useProgress();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <SEO
        title="Course Overview — Most Perfect"
        description="Browse all 6 parts and 29 chapters of Most Perfect. Start anywhere, track completion, and build your Above Human standard."
        path="/course"
      />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Course Overview</h1>
            <p className="mt-2 text-muted-foreground">
              Navigate through all 6 parts and 29 chapters of your journey.
            </p>
          </div>
          <Button variant="outline" onClick={openGlobalSearch} className="w-full gap-2 sm:w-auto">
            <Search className="h-4 w-4" />
            Search chapters
          </Button>
        </div>
      </motion.div>

      {/* Prologue */}
      <div className="mt-8">
        <Link
          to="/read/prologue"
          className={cn(
            "flex items-center gap-3 rounded-lg border p-4 transition-all hover:border-primary/30 hover:shadow-sm",
            isCompleted("prologue") && "bg-success/5 border-success/30"
          )}
        >
          <div className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
            isCompleted("prologue") ? "bg-success text-success-foreground" : "bg-secondary text-secondary-foreground"
          )}>
            {isCompleted("prologue") ? <Check className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
          </div>
          <div>
            <p className="font-serif text-base font-semibold text-foreground">Prologue: {PROLOGUE.title}</p>
            <p className="text-sm text-muted-foreground">{PROLOGUE.description}</p>
          </div>
        </Link>
      </div>

      {/* Parts */}
      <Accordion type="multiple" defaultValue={bookParts.map(p => p.id)} className="mt-6">
        {bookParts.map((part) => {
          const partProgress = getPartProgress(part.chapters.map(c => c.id));
          return (
            <AccordionItem key={part.id} value={part.id} className="border-none">
              <AccordionTrigger className="rounded-lg px-4 py-3 hover:bg-accent hover:no-underline [&[data-state=open]]:bg-accent/50">
                <div className="flex flex-1 items-center gap-3 text-left">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {part.number}
                  </span>
                  <div className="flex-1">
                    <p className="font-serif text-base font-semibold">{part.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Progress value={partProgress.percentage} className="h-1.5 w-24" />
                      <span className="text-xs text-muted-foreground">
                        {partProgress.completed}/{partProgress.total}
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2 pl-4">
                <div className="space-y-1.5 pt-1">
                  {part.chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      to={`/read/${chapter.id}`}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-4 py-3 text-sm transition-all hover:bg-accent",
                        isCompleted(chapter.id) && "bg-success/5"
                      )}
                    >
                      <div className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                        isCompleted(chapter.id)
                          ? "bg-success text-success-foreground"
                          : "border border-border text-muted-foreground"
                      )}>
                        {isCompleted(chapter.id) ? <Check className="h-3 w-3" /> : chapter.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("font-medium truncate", isCompleted(chapter.id) && "text-muted-foreground")}>
                          {chapter.isMiniChapter && <span className="text-primary text-xs mr-1">MINI</span>}
                          {chapter.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{chapter.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Epilogue */}
      <div className="mt-4">
        <Link
          to="/read/epilogue"
          className={cn(
            "flex items-center gap-3 rounded-lg border p-4 transition-all hover:border-primary/30 hover:shadow-sm",
            isCompleted("epilogue") && "bg-success/5 border-success/30"
          )}
        >
          <div className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
            isCompleted("epilogue") ? "bg-success text-success-foreground" : "bg-secondary text-secondary-foreground"
          )}>
            {isCompleted("epilogue") ? <Check className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
          </div>
          <div>
            <p className="font-serif text-base font-semibold text-foreground">Epilogue: {EPILOGUE.title}</p>
            <p className="text-sm text-muted-foreground">{EPILOGUE.description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourseOverview;
