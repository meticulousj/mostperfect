import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PremiumState = {
  premium: boolean;
  loading: boolean;
  authenticated: boolean;
  refresh: () => Promise<void>;
  startCheckout: () => Promise<void>;
  checkoutLoading: boolean;
};

export const usePremium = (): PremiumState => {
  const [premium, setPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;
    setAuthenticated(!!session);
    if (!session) {
      setPremium(false);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.functions.invoke("check-premium");
    if (error) {
      console.error("check-premium failed", error);
      setPremium(false);
    } else {
      setPremium(!!data?.premium);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      refresh();
    });
    return () => sub.subscription.unsubscribe();
  }, [refresh]);

  // Verify after Stripe redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const status = params.get("checkout");
    if (status === "success" && sessionId) {
      (async () => {
        await supabase.functions.invoke("verify-payment", {
          body: { session_id: sessionId },
        });
        await refresh();
        // Clean URL
        const url = new URL(window.location.href);
        url.searchParams.delete("session_id");
        url.searchParams.delete("checkout");
        window.history.replaceState({}, "", url.toString());
      })();
    }
  }, [refresh]);

  const startCheckout = useCallback(async () => {
    setCheckoutLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        window.location.href = "/auth?redirect=/workbooks";
        return;
      }
      const { data, error } = await supabase.functions.invoke("create-checkout");
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error("startCheckout failed", e);
    } finally {
      setCheckoutLoading(false);
    }
  }, []);

  return { premium, loading, authenticated, refresh, startCheckout, checkoutLoading };
};
