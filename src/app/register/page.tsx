"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-navy via-blue via-40% to-red relative items-center justify-center">
        <div className="px-16">
          <Link href="/" className="flex items-center gap-3 no-underline mb-12">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="8" width="24" height="20" rx="2" />
              <path d="M12 8V4M20 8V4M4 14h24" />
              <circle cx="16" cy="21" r="3" />
            </svg>
            <span className="font-heading text-3xl font-bold text-white">BookIt</span>
          </Link>
          <h1 className="font-heading text-5xl font-bold text-white leading-tight mb-6">
            Join BookIt today
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-md">
            Create your account and start discovering unique stays across Tunisia — from coastal villas to desert retreats.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden flex items-center gap-2 no-underline mb-10">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#2B5EA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="8" width="24" height="20" rx="2" />
              <path d="M12 8V4M20 8V4M4 14h24" />
              <circle cx="16" cy="21" r="3" />
            </svg>
            <span className="font-heading text-2xl font-bold text-blue">BookIt</span>
          </Link>

          <h2 className="font-heading text-3xl font-bold text-navy mb-2">Create account</h2>
          <p className="text-text-muted mb-8">
            Already have an account?{" "}
            <Link href="/login" className="text-blue font-semibold no-underline hover:underline">
              Sign in
            </Link>
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red/10 border border-red/20 rounded-xl text-red text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nour Khammassi"
                required
                className="px-4 py-3.5 border-[1.5px] border-border rounded-xl text-[15px] text-text outline-none focus:border-blue transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="px-4 py-3.5 border-[1.5px] border-border rounded-xl text-[15px] text-text outline-none focus:border-blue transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="px-4 py-3.5 border-[1.5px] border-border rounded-xl text-[15px] text-text outline-none focus:border-blue transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="px-4 py-3.5 border-[1.5px] border-border rounded-xl text-[15px] text-text outline-none focus:border-blue transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-8 py-3.5 bg-blue text-white border-none rounded-xl text-[15px] font-semibold cursor-pointer font-body hover:bg-navy transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}