"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [where, setWhere] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (where) params.set("location", where);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="relative z-10 -mt-10 mx-16 bg-white rounded-2xl p-6 px-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] flex items-end gap-4 flex-wrap">
      <div className="flex-1 min-w-[180px] flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">
          Where
        </label>
        <input
          type="text"
          value={where}
          onChange={(e) => setWhere(e.target.value)}
          placeholder="Search destinations..."
          className="px-4 py-3 border-[1.5px] border-border rounded-[10px] text-[15px] text-text outline-none focus:border-blue transition-colors"
        />
      </div>

      <div className="flex-[0.6] min-w-[140px] flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">
          Check in
        </label>
        <input
          type="date"
          className="px-4 py-3 border-[1.5px] border-border rounded-[10px] text-[15px] text-text-muted outline-none focus:border-blue transition-colors"
        />
      </div>

      <div className="flex-[0.6] min-w-[140px] flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">
          Check out
        </label>
        <input
          type="date"
          className="px-4 py-3 border-[1.5px] border-border rounded-[10px] text-[15px] text-text-muted outline-none focus:border-blue transition-colors"
        />
      </div>

      <div className="flex-[0.4] min-w-[120px] flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">
          Guests
        </label>
        <select className="px-4 py-3 border-[1.5px] border-border rounded-[10px] text-[15px] text-text-muted outline-none focus:border-blue transition-colors bg-white">
          <option>1 guest</option>
          <option>2 guests</option>
          <option>3 guests</option>
          <option>4+ guests</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="px-8 py-3.5 bg-red text-white border-none rounded-[10px] text-[15px] font-semibold cursor-pointer flex items-center gap-2 font-body hover:bg-red/90 transition-colors"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        Search
      </button>
    </div>
  );
}