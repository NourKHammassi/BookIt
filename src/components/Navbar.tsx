import Link from "next/link";

export default function Navbar() {
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

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm font-semibold text-blue no-underline px-5 py-2.5 border-[1.5px] border-blue rounded-lg hover:bg-blue hover:text-white transition-colors"
        >
          Log in
        </Link>
        <Link
          href="/login" className="text-sm font-semibold !text-white no-underline px-5 py-2.5 bg-blue rounded-lg hover:bg-navy transition-colors"        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}