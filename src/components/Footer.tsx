import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy px-16 py-12 flex justify-between items-center flex-wrap gap-6">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="8" width="24" height="20" rx="2" />
          <path d="M12 8V4M20 8V4M4 14h24" />
          <circle cx="16" cy="21" r="3" />
        </svg>
        <span className="font-heading text-xl font-bold text-white">
          BookIt
        </span>
      </Link>

      <div className="flex gap-8">
        <span className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors">
          About
        </span>
        <span className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors">
          Privacy
        </span>
        <span className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors">
          Terms
        </span>
        <span className="text-sm text-white/70 cursor-pointer hover:text-white transition-colors">
          Support
        </span>
      </div>

      <span className="text-[13px] text-white/50">
        © 2026 BookIt. All rights reserved.
      </span>
    </footer>
  );
}