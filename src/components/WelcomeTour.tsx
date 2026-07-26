import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sparkles, Target, Mail, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bookParts, PROLOGUE } from "@/data/bookContent";

const TOUR_KEY = "mostperfect-onboarded";
const PREFS_KEY = "mostperfect-onboarding-prefs";

type StartOption = { id: string; label: string; sublabel: string; chapterId: string };

const startOptions: StartOption[] = [
  { id: "prologue", label: "Start from the Prologue", sublabel: "Recommended — full journey", chapterId: PROLOGUE.id },
  ...bookParts.map((p) => ({
    id: p.id,
    label: `Part ${p.number}: ${p.title}`,
    sublabel: p.subtitle,
    chapterId: p.chapters[0].id,
  })),
];

const goals = [
  { value: 1, label: "Casual", desc: "1 chapter / week" },
  { value: 3, label: "Steady", desc: "3 chapters / week" },
  { value: 7, label: "Immersed", desc: "1 chapter / day" },
];

const WelcomeTour = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [startId, setStartId] = useState<string>("prologue");
  const [goal, setGoal] = useState<number>(3);
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      if (!localStorage.getItem(TOUR_KEY)) {
        // Delay slightly so first paint isn't jarring
        const t = setTimeout(() => setOpen(true), 400);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  const finish = (skipped = false) => {
    try {
      localStorage.setItem(TOUR_KEY, "1");
      localStorage.setItem(
        PREFS_KEY,
        JSON.stringify({ startId, goal, email: email || null, completedAt: new Date().toISOString() })
      );
    } catch {}
    setOpen(false);
    if (skipped) return;
    const opt = startOptions.find((o) => o.id === startId) ?? startOptions[0];
    navigate(`/read/${opt.chapterId}`);
  };

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) finish(true); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Welcome · Step {step + 1} of 3
          </p>
          <DialogTitle className="font-serif text-2xl">
            {step === 0 && "Where would you like to begin?"}
            {step === 1 && "Set your reading pace"}
            {step === 2 && "Stay connected (optional)"}
          </DialogTitle>
          <DialogDescription>
            {step === 0 && "Start from the beginning or jump to a part that calls to you. You can change this anytime."}
            {step === 1 && "A gentle rhythm — no accounts, no reminders unless you want them."}
            {step === 2 && "Get The Standard, our newsletter on living Above Human, Proven, and Verified."}
          </DialogDescription>
        </DialogHeader>

        {step === 0 && (
          <div className="max-h-[45vh] space-y-2 overflow-y-auto pr-1">
            {startOptions.map((o) => {
              const selected = startId === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => setStartId(o.id)}
                  className={`w-full rounded-lg border p-3 text-left transition-all ${
                    selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"
                    }`}>
                      {selected && <Check className="h-3 w-3" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{o.label}</p>
                      <p className="text-sm text-muted-foreground">{o.sublabel}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-3 sm:grid-cols-3">
            {goals.map((g) => {
              const selected = goal === g.value;
              return (
                <button
                  key={g.value}
                  onClick={() => setGoal(g.value)}
                  className={`rounded-lg border p-4 text-center transition-all ${
                    selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <Target className={`mx-auto h-5 w-5 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="mt-2 font-medium text-foreground">{g.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{g.desc}</p>
                </button>
              );
            })}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-lg border bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  No account required to read. Add your email only if you'd like The Standard delivered to you.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tour-email">Email (optional)</Label>
              <Input
                id="tour-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {email && (
              <a
                href={`https://freethinkinggenius.substack.com/subscribe?email=${encodeURIComponent(email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                Confirm subscription on Substack
              </a>
            )}
          </div>
        )}

        <div className="mt-2 flex items-center justify-between gap-2">
          <Button variant="ghost" onClick={() => finish(true)} className="text-muted-foreground">
            Skip
          </Button>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <Button variant="outline" onClick={back} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            {step < 2 ? (
              <Button onClick={next} className="gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => finish(false)} className="gap-2">
                Start reading
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
