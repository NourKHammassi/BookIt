"use client";

import { useState } from "react";

interface Props {
  propertyId: string;
  pricePerNight: number;
  avgRating: number | null;
  reviewCount: number;
}

export default function PropertyBookingCard({
  propertyId,
  pricePerNight,
  avgRating,
  reviewCount,
}: Props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const total = nights * pricePerNight;

  return (
    <div className="w-[380px] shrink-0 sticky top-10 self-start">
      <div className="border border-border rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
        {/* Price */}
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <span className="text-2xl font-bold text-navy">
              {pricePerNight} TND
            </span>
            <span className="text-sm text-text-muted ml-1">/ night</span>
          </div>
          {avgRating && (
            <div className="flex items-center gap-1 text-sm">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#C4503D"
                stroke="#C4503D"
                strokeWidth="1"
              >
                <polygon points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9" />
              </svg>
              <span className="font-semibold text-text">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-text-muted">
                ({reviewCount})
              </span>
            </div>
          )}
        </div>

        {/* Date inputs */}
        <div className="grid grid-cols-2 border border-border rounded-xl overflow-hidden mb-3">
          <div className="p-3 border-r border-border">
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border-none outline-none text-sm text-text bg-transparent"
            />
          </div>
          <div className="p-3">
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">
              Checkout
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border-none outline-none text-sm text-text bg-transparent"
            />
          </div>
        </div>

        <div className="border border-border rounded-xl p-3 mb-4">
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border-none outline-none text-sm text-text bg-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} guest{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Reserve button */}
        <button className="w-full py-3.5 bg-red text-white border-none rounded-xl text-base font-semibold cursor-pointer font-body hover:bg-red/90 transition-colors">
          Reserve
        </button>

        {/* Price breakdown */}
        {nights > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between text-sm text-text mb-2">
              <span>
                {pricePerNight} TND × {nights} night{nights > 1 ? "s" : ""}
              </span>
              <span>{total} TND</span>
            </div>
            <div className="flex justify-between text-base font-bold text-navy pt-3 border-t border-border">
              <span>Total</span>
              <span>{total} TND</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}