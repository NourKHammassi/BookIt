"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/properties", label: "Properties", icon: "building" },
  { href: "/admin/bookings", label: "Bookings", icon: "calendar" },
];

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1A3654] text-white flex flex-col z-50">
      <div className="p-6 border-b border-white/10">
        <Link
          href="/"
          className="text-xl font-heading font-semibold tracking-wide no-underline text-white"
        >
          BookIt
        </Link>
        <p className="text-[11px] text-white/40 mt-1 font-body">
          Management
        </p>
      </div>

      <nav className="flex-1 py-6 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-[13px] font-body font-medium no-underline transition-all duration-200 ${
                isActive
                  ? "bg-white/12 text-white"
                  : "text-white/50 hover:text-white/90 hover:bg-white/6"
              }`}
            >
              <NavIcon name={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2B5EA7] to-[#E8A830] flex items-center justify-center text-xs font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[13px] font-medium font-body">{userName}</p>
            <p className="text-[10px] text-white/35 font-body">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavIcon({ name }: { name: string }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "grid":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "building":
      return (
        <svg {...props}>
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
          <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    default:
      return null;
  }
}