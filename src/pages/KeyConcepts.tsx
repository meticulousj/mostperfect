import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Scale, Brain, ShieldCheck, Sparkles, Eye, Flame, Target, Gem, Heart, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";
import PremiumGate from "@/components/PremiumGate";

const laws = [
  { icon: Eye, title: "The Law of Verification", desc: "Submit every belief and decision to the test of evidence." },
  { icon: Brain, title: "The Rejection of Bias", desc: "Actively identify and counteract cognitive distortions." },
  { icon: Target, title: "The Pursuit of the Invariant", desc: "Build your life on principles that hold true across time and context." },
  { icon: Sparkles, title: "The Scientific Spirit", desc: "Approach life as an experiment—hypothesize, test, observe, adjust." },
  { icon: Scale, title: "The 80/20 Sanctity", desc: "Focus energy on the 20% of actions that produce 80% of results." },
  { icon: ShieldCheck, title: "The Transcendence of Ego", desc: "Release external validation; anchor worth in alignment and evidence." },
  { icon: Flame, title: "The Duty of Articulation", desc: "What you cannot articulate, you do not truly understand." },
  { icon: Gem, title: "The Resilience of Granite", desc: "Withstand pressure without losing shape." },
  { icon: Heart, title: "The Unity of Faith and Reason", desc: "Spiritual intuition and empirical evidence are complementary." },
  { icon: Crown, title: "The Ultimate Standard", desc: "Hold yourself to a standard so high it becomes your identity." },
];

const coreConcepts = [
  {
    title: "Most Perfect",
    desc: "The highest possible standard a human being can hold—rooted not in flawlessness, but in alignment, discipline, and relentless growth.",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Above Human",
    desc: "A disciplined way of perceiving, thinking, and acting that transcends the default settings of fear, bias, and self-deception.",
    color: "bg-accent text-accent-foreground",
  },
  {
    title: "Proven and Verified",
    desc: "A standard for truth independent of preference or emotion—grounded in evidence, logic, consistency, and lived results.",
    color: "bg-success/10 text-success",
  },
];

const KeyConcepts = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <SEO
        title="Key Concepts — The 10 Laws & Three Pillars | Most Perfect"
        description="The 10 Laws of the Proven Life and the Three Pillars of the Above Human path. Core principles distilled from Most Perfect."
        path="/concepts"
      />
      <PremiumGate
        title="Unlock Key Concepts"
        description="Premium access reveals the full 10 Laws, Three Pillars, and the Manifesto — plus all six workbooks."
      >
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-3xl font-bold text-foreground">Key Concepts</h1>
        <p className="mt-2 text-muted-foreground">
          The core principles and laws that define the Most Perfect path.
        </p>
      </motion.div>

      {/* Three Pillars */}
      <section className="mt-10">
        <h2 className="font-serif text-xl font-semibold text-foreground">The Three Pillars</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {coreConcepts.map((concept, i) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <span className={`inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${concept.color}`}>
                    {concept.title}
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{concept.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The 10 Laws */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-foreground">The 10 Laws of the Proven Life</h2>
          <Link to="/read/ch-10" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Read full chapter <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {laws.map((law, i) => (
            <motion.div
              key={law.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3 rounded-lg border bg-card p-4"
            >
              <law.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-card-foreground">{law.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{law.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Manifesto excerpt */}
      <section className="mt-12 rounded-lg border bg-accent/30 p-6">
        <h2 className="font-serif text-xl font-semibold text-foreground">The Manifesto</h2>
        <blockquote className="mt-4 space-y-3 font-serif text-sm italic leading-relaxed text-foreground/90">
          <p>"I refuse to be ruled by my first thoughts, my weakest impulses, or the fears I inherited from the world."</p>
          <p>"I will not worship perfection as image. I will pursue perfection as integrity."</p>
          <p>"You will not be flawless. You will be aligned. You will not be unbreakable. You will be unwavering."</p>
        </blockquote>
        <Link to="/read/ch-29" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Read the full Manifesto <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>
      </PremiumGate>
    </div>
  );
};

export default KeyConcepts;
