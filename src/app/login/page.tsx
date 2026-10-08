"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
      router.refresh();
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
            Welcome back to BookIt
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-md">
            Sign in to manage your bookings, leave reviews, and discover new places to stay across Tunisia.
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

          <h2 className="font-heading text-3xl font-bold text-navy mb-2">Sign in</h2>
          <p className="text-text-muted mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue font-semibold no-underline hover:underline">
              Create one
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

            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-8 py-3.5 bg-blue text-white border-none rounded-xl text-[15px] font-semibold cursor-pointer font-body hover:bg-navy transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-cream text-sm text-text-muted">or</span>
            </div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full px-8 py-3.5 bg-white border-[1.5px] border-border rounded-xl text-[15px] font-semibold cursor-pointer font-body hover:border-blue transition-colors flex items-center justify-center gap-3 text-text"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}