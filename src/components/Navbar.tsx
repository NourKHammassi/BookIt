"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4 md:py-5 bg-white border-b border-border">
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
        <span className="font-heading text-xl md:text-2xl font-bold text-blue">
          BookIt
        </span>
      </Link>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/search" className="text-[15px] font-medium no-underline text-text-muted hover:text-blue">
          Explore
        </Link>
        <Link href="/about" className="text-[15px] font-medium no-underline text-text-muted hover:text-blue">
          About
        </Link>
        <Link href="/contact" className="text-[15px] font-medium no-underline text-text-muted hover:text-blue">
          Contact
        </Link>
      </div>

      {/* Desktop auth */}
      <div className="hidden md:block">
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
                    {(session?.user as any)?.role === "ADMIN" && (
                      <Link href="/admin" onClick={() => setMenuOpen(false)} className="block px-5 py-3 text-[13px] font-medium text-text-muted no-underline hover:text-blue hover:bg-cream transition-colors">
                        Admin panel
                      </Link>
                    )}
                    <Link href="/favorites" onClick={() => setMenuOpen(false)} className="block px-5 py-3 text-[13px] font-medium text-text-muted no-underline hover:text-blue hover:bg-cream transition-colors">
                      My favorites
                    </Link>
                    <Link href="/bookings" onClick={() => setMenuOpen(false)} className="block px-5 py-3 text-[13px] font-medium text-text-muted no-underline hover:text-blue hover:bg-cream transition-colors">
                      My bookings
                    </Link>
                    <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full text-left px-5 py-3 text-[13px] font-medium text-text-muted hover:text-red hover:bg-cream cursor-pointer transition-colors">
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-blue no-underline px-5 py-2.5 border-[1.5px] border-blue rounded-lg hover:bg-blue hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/register" className="text-sm font-semibold !text-white no-underline px-5 py-2.5 bg-blue rounded-lg hover:bg-navy transition-colors">
              Sign up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
      >
        <span className={`block w-6 h-0.5 bg-navy transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-navy transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-navy transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-full left-0 right-0 bg-white border-b border-border z-50 px-4 py-4 flex flex-col gap-1 shadow-lg">
            <Link href="/search" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-[15px] font-medium text-text-muted no-underline hover:text-blue hover:bg-cream rounded-lg">
              Explore
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-[15px] font-medium text-text-muted no-underline hover:text-blue hover:bg-cream rounded-lg">
              About
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-[15px] font-medium text-text-muted no-underline hover:text-blue hover:bg-cream rounded-lg">
              Contact
            </Link>
            {session?.user ? (
              <>
                <div className="border-t border-border my-2" />
                {(session?.user as any)?.role === "ADMIN" && (
                  <Link href="/admin" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-[15px] font-medium text-text-muted no-underline hover:text-blue hover:bg-cream rounded-lg">
                    Admin panel
                  </Link>
                )}
                <Link href="/favorites" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-[15px] font-medium text-text-muted no-underline hover:text-blue hover:bg-cream rounded-lg">
                  My favorites
                </Link>
                <Link href="/bookings" onClick={() => setMobileOpen(false)} className="block py-3 px-4 text-[15px] font-medium text-text-muted no-underline hover:text-blue hover:bg-cream rounded-lg">
                  My bookings
                </Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full text-left py-3 px-4 text-[15px] font-medium text-red cursor-pointer hover:bg-cream rounded-lg">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-border my-2" />
                <div className="flex gap-3 px-4 py-2">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm font-semibold text-blue no-underline px-4 py-2.5 border-[1.5px] border-blue rounded-lg">
                    Log in
                  </Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm font-semibold !text-white no-underline px-4 py-2.5 bg-blue rounded-lg">
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
}