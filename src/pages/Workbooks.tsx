import { motion } from "framer-motion";
import { Download, FileText, ClipboardCheck, Compass, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookParts } from "@/data/bookContent";
import SEO from "@/components/SEO";

const workbookMeta: Record<string, { essence: string }> = {
  "part-1": {
    essence:
      "Locate your current relationship to perfection, evidence, and the standards you have inherited.",
  },
  "part-2": {
    essence:
      "Test where your operating beliefs come from across theology, science, technology, psychology, and philosophy.",
  },
  "part-3": {
    essence:
      "Forge the Above Human mind: the 10 Laws, your dominant biases, your fear loops, and a chosen identity.",
  },
  "part-4": {
    essence:
      "Audit your standards across mastery, communication, discipline, integrity, leadership, and purpose.",
  },
  "part-5": {
    essence:
      "Design the operating system you run on: pressure protocols, relationships, environments, and legacy.",
  },
  "part-6": {
    essence:
      "Turn the manifesto into practice: virtues, weekly verification, and a personal declaration.",
  },
};

const Workbooks = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Premium Workbooks
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Deep-Dive Companion Worksheets
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              One downloadable PDF workbook for each of the six parts of the book — built around
              self-assessment, identity mapping, and action planning. A direct complement to the{" "}
              <a
                href="/Verification_Blueprint.pdf"
                download
                className="text-primary underline-offset-4 hover:underline"
              >
                Verification Blueprint
              </a>
              .
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-2xl">
              <div className="flex items-start gap-2 text-sm">
                <ClipboardCheck className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Honest 1–5 self-assessment</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Compass className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Identity mapping prompts</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Target className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Specific action commitments</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {bookParts.map((part, i) => {
            const href = `/workbooks/workbook_part_${i + 1}.pdf`;
            const filename = `Most_Perfect_Workbook_Part_${i + 1}.pdf`;
            return (
              <motion.div
                key={part.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex h-full flex-col rounded-lg border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Part {part.number}
                    </span>
                    <h2 className="mt-1 font-serif text-xl font-semibold text-card-foreground">
                      {part.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{part.subtitle}</p>
                  </div>
                  <FileText className="h-6 w-6 shrink-0 text-muted-foreground" />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {workbookMeta[part.id]?.essence}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild className="gap-2">
                    <a href={href} download={filename}>
                      <Download className="h-4 w-4" />
                      Download PDF
                    </a>
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {part.chapters.length} chapters · 5 pages
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 rounded-lg border bg-accent/30 p-6 text-center">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Pair the workbooks with the Verification Blueprint
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The Blueprint maps the full framework. The workbooks turn each part into practice.
          </p>
          <Button asChild variant="outline" className="mt-4 gap-2">
            <a href="/Verification_Blueprint.pdf" download>
              <Download className="h-4 w-4" />
              Download Verification Blueprint
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Workbooks;
