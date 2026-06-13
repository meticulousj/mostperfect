import { Lock, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePremium } from "@/hooks/usePremium";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

const PREMIUM_FEATURES = [
  "All 6 part workbooks (PDF downloads)",
  "Full Key Concepts library — 10 Laws & Three Pillars",
  "The Manifesto and Verification Blueprint references",
  "Lifetime access — one-time payment, no subscription",
];

const PremiumGate = ({
  title = "Unlock Premium",
  description = "Get lifetime access to all workbooks and Key Concepts for a single one-time payment.",
  children,
}: Props) => {
  const { premium, loading, authenticated, startCheckout, checkoutLoading } = usePremium();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (premium) return <>{children}</>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="rounded-2xl border bg-card p-8 sm:p-12 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">
          Premium · Lifetime Access
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>

        <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
          {PREMIUM_FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-foreground">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <p className="font-serif text-4xl font-bold text-foreground">
            $29
            <span className="ml-2 align-middle text-sm font-normal text-muted-foreground">
              one-time
            </span>
          </p>
          <Button
            size="lg"
            className="mt-6 min-w-[220px] gap-2"
            onClick={startCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {authenticated ? "Unlock Premium" : "Sign in to unlock"}
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Secure checkout via Stripe. Lifetime access — no recurring charges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumGate;
