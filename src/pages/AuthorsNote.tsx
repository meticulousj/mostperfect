import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const paragraphs = [
  "This book was born from a single, persistent question: How does a person rise above the limits that quietly shape their life?",
  "Not the dramatic limits—the obvious obstacles, tragedies, or setbacks. But the subtle ones: bias, emotion, drift, fear, inherited beliefs, and the quiet standards we never realized we were following.",
  "For years, I watched people with extraordinary potential undermine themselves, not because they lacked ability, but because they lacked clarity. They lived with unverified beliefs. They made unexamined decisions. They carried identities that were never chosen. They reacted to pressures instead of rising above them.",
  "I wrote this book to offer a different path. A path rooted in truth, discipline, verification, and purpose. A path that does not require perfection, but requires alignment. A path that honors humanity while inviting us to move beyond its default settings.",
  "Every chapter in this book reflects something I have lived, tested, failed at, returned to, and practiced again. Nothing here is theoretical. Nothing here is borrowed without refinement. Nothing here is presented as dogma.",
  "These pages contain what I believe to be the closest thing to a reliable operating system for a life of clarity, resilience, leadership, and personal excellence.",
];

const closingParagraphs = [
  "This work is not about becoming flawless. It is about becoming aligned. It is about verifying the stories you live by. It is about rising above the impulses, fears, and cognitive shortcuts that hold most people in place. It is about constructing a life that withstands pressure, scrutiny, and time.",
  "You will not live this entire standard perfectly. Neither will I. No one does.",
  "But every day you return to alignment—every time you choose clarity over impulse, truth over comfort, discipline over drift—you strengthen your character. You refine your identity. You rise a little higher above the default human setting.",
  "This book is not meant to be memorized. It is meant to be practiced. Revisited. Verified. Lived.",
  "If these ideas challenge you, stay with them. If they confront you, let them. If they elevate you, follow them.",
  "And if they change you—even a little—then this work has fulfilled its purpose.",
  "Thank you for reading. Thank you for thinking deeply. Thank you for choosing a higher standard.",
];

const AuthorsNote = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Author's Note — Most Perfect by Jessica Butler"
        description="The origin and intent behind Most Perfect: a reliable operating system for clarity, resilience, leadership, and personal excellence."
        path="/authors-note"
        type="article"
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            From the Author
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Author's Note
          </h1>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90 sm:text-lg">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <p className="font-medium">
              If there is one message I hope you take from this book, it is this:
            </p>

            <blockquote className="border-l-4 border-primary pl-6 font-serif text-xl italic text-foreground sm:text-2xl">
              You are not limited to the identity you inherited. You are free to build the one you choose.
            </blockquote>

            {closingParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <blockquote className="border-l-4 border-primary pl-6 font-serif text-xl italic text-foreground sm:text-2xl">
              The Most Perfect life is not promised. It is built. One aligned decision at a time.
            </blockquote>
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t pt-8">
            <Button asChild size="lg" className="gap-2">
              <Link to="/read/prologue">
                Read the Prologue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <a href="https://freethinkinggenius.substack.com/s/thestandard" target="_blank" rel="noopener noreferrer">
                <Mail className="h-4 w-4" />
                Subscribe to The Standard
              </a>
            </Button>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default AuthorsNote;
