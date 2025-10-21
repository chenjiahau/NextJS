"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { tokenStore } from "@/lib/token.store";

const PUBLIC_ROUTES = ["/login", "/signup"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If current route is public, don’t guard it.
    if (PUBLIC_ROUTES.includes(pathname)) {
      setLoading(false);
      return;
    }

    const token = tokenStore.get();

    if (!token) {
      // render nothing while redirecting; avoids flashing "Loading..."
      router.replace("/login");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (!res.ok) throw new Error("Invalid token");
        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) router.replace("/login");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  // While redirecting or checking, render nothing to avoid the "Loading..." flash
  if (loading) return null;

  return children;
}
