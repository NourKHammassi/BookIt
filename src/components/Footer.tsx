import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy px-4 md:px-8 lg:px-16 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="8" width="24" height="20" rx="2" />
          <path d="M12 8V4M20 8V4M4 14h24" />
          <circle cx="16" cy="21" r="3" />
        </svg>
        <span className="font-heading text-xl font-bold text-white">BookIt</span>
      </Link>

      <div className="flex gap-6 md:gap-8">
        <Link href="/about" className="text-sm text-white/70 no-underline hover:text-white transition-colors">About</Link>
        <span className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors">Privacy</span>
        <span className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors">Terms</span>
        <Link href="/contact" className="text-sm text-white/70 no-underline hover:text-white transition-colors">Support</Link>
      </div>

      <span className="text-[13px] text-white/50">© 2026 BookIt. All rights reserved.</span>
    </footer>
  );
}