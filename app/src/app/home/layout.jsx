"use client";
import AuthGuard from "@/components/AuthGuard";

export default function AppLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
