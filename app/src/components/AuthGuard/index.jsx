"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { tokenStore } from "@/lib/token.store";

const PUBLIC = ["/login", "/signup"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const redirecting = useRef(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  useEffect(() => {
    // never guard public routes
    if (PUBLIC.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
      setReady(true);
      return;
    }

    if (redirecting.current) return; // avoid double replace

    const token = tokenStore.get();
    if (!token) {
      redirecting.current = true;
      router.replace("/login");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (!res.ok) throw new Error("invalid");
        if (alive.current) setReady(true);
      } catch {
        if (!redirecting.current) {
          redirecting.current = true;
          router.replace("/login");
        }
      }
    })();
  }, [pathname, router]);

  // Render nothing while checking/redirecting (prevents Suspense churn)
  if (!ready) return null;
  return children;
}
