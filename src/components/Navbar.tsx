"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-16 py-5 bg-white border-b border-border">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#2B5EA7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="8" width="24" height="20" rx="2" />
          <path d="M12 8V4M20 8V4M4 14h24" />
          <circle cx="16" cy="21" r="3" />
        </svg>
        <span className="font-heading text-2xl font-bold text-blue">
          BookIt
        </span>
      </Link>

      <div className="flex items-center gap-8">
        <Link
          href="/search"
          className="text-[15px] font-medium no-underline text-text-muted hover:text-blue"
        >
          Explore
        </Link>
        <span className="text-[15px] font-medium text-text-muted cursor-pointer hover:text-blue">
          About
        </span>
        <span className="text-[15px] font-medium text-text-muted cursor-pointer hover:text-blue">
          Contact
        </span>
      </div>

      {session?.user ? (
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <span className="text-[15px] font-medium text-text-muted group-hover:text-navy transition-colors">
              {session.user.name || "User"}
            </span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue to-navy flex items-center justify-center text-white text-[13px] font-bold tracking-wide ring-2 ring-white shadow-sm">
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-border/60 z-50 overflow-hidden">
                <div className="px-5 py-4">
                  <p className="text-[13px] font-semibold text-navy truncate">{session.user.name}</p>
                  <p className="text-[12px] text-text-muted truncate mt-0.5">{session.user.email}</p>
                </div>
                <div className="border-t border-border/60">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-5 py-3 text-[13px] font-medium text-text-muted hover:text-red hover:bg-cream cursor-pointer transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold text-blue no-underline px-5 py-2.5 border-[1.5px] border-blue rounded-lg hover:bg-blue hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold !text-white no-underline px-5 py-2.5 bg-blue rounded-lg hover:bg-navy transition-colors"
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}