"use client";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { tokenStore } from "@/lib/token.store";

const AuthCtx = createContext(null);
export function useAuth() {
  return useContext(AuthCtx);
}

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(tokenStore.get());
  }, []);

  const login = (t) => {
    tokenStore.save(t);
    setToken(t);
  };
  const logout = () => {
    tokenStore.remove();
    setToken(null);
  };

  const value = useMemo(
    () => ({ token, loggedIn: !!token, login, logout }),
    [token]
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
