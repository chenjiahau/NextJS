"use client";

import authFormStyle from "@/styles/modules/auth.form.module.scss";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tokenStore } from "@/lib/token.client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json?.error || "Login failed.");
        setLoading(false);
        return;
      }

      // Save token to local storage
      tokenStore.save(json.token);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    } catch (e) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  useEffect(() => {
    // Redirect if already logged in
    const token = tokenStore.get();
    if (token) {
      router.replace("/");
    }
  }, [router]);

  return (
    <main className={authFormStyle.container}>
      <section className={authFormStyle.box}>
        <h1 className={authFormStyle.title}>Welcome back</h1>
        <p className={authFormStyle.description}>
          Log in with your credentials to continue.
        </p>

        <form onSubmit={onSubmit} className={authFormStyle.form}>
          {success && (
            <div className={authFormStyle.success_message}>{success}</div>
          )}
          {error && <div className={authFormStyle.error_message}>{error}</div>}

          <div>
            <label htmlFor='email' className={authFormStyle.label}>
              Email
            </label>
            <input
              id='email'
              type='email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={authFormStyle.input}
              placeholder='you@example.com'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className={authFormStyle.label}>
              Password
            </label>
            <div className='relative'>
              <input
                id='password'
                type={showPw ? "text" : "password"}
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={authFormStyle.input}
                placeholder='Enter your password'
                required
              />
              <button
                type='button'
                onClick={() => setShowPw((v) => !v)}
                className={authFormStyle.toggle_password_button}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className={authFormStyle.submit_button}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className={authFormStyle.redirect}>
            Don’t have an account?{" "}
            <a href='/signup' className={authFormStyle.redirect_link}>
              Sign up
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}
