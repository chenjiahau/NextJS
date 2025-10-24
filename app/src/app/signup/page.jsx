"use client";

import authFormStyle from "@/styles/modules/auth.form.module.scss";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { tokenStore } from "@/lib/token.store";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          name: name.trim() || null,
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json?.error || "Sign up failed.");
        setLoading(false);
        return;
      }

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.replace("/login");
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
      router.replace("/home");
    }
  }, [router]);

  return (
    <main className={authFormStyle.container}>
      <section className={authFormStyle.box}>
        <h1 className={authFormStyle.title}>Create your account</h1>
        <p className={authFormStyle.description}>
          Sign up with your email and a password.
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
            <label htmlFor='name' className={authFormStyle.label}>
              Name (optional)
            </label>
            <input
              id='name'
              type='text'
              autoComplete='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={authFormStyle.input}
              placeholder='Your name'
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
                autoComplete='new-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={authFormStyle.input}
                placeholder='At least 8 characters'
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

          <div>
            <label htmlFor='confirm' className={authFormStyle.label}>
              Confirm password
            </label>
            <input
              id='confirm'
              type={showPw ? "text" : "password"}
              autoComplete='new-password'
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={authFormStyle.input}
              placeholder='Re-enter password'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className={authFormStyle.submit_button}
          >
            {loading ? "Creating..." : "Sign up"}
          </button>

          <p className={authFormStyle.redirect}>
            Already have an account?{" "}
            <a href='/login' className={authFormStyle.redirect_link}>
              Log in
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}
