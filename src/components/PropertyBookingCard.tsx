"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  propertyId: string;
  pricePerNight: number;
  maxGuests: number;
  title: string;
}

export default function PropertyBookingCard({ propertyId, pricePerNight, maxGuests, title }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice = nights > 0 ? nights * pricePerNight : 0;

  function handleReserveClick() {
    if (!session) {
      router.push("/login");
      return;
    }
    if (!checkIn || !checkOut) {
      setError("Select check-in and check-out dates");
      return;
    }
    if (nights <= 0) {
      setError("Check-out must be after check-in");
      return;
    }
    setError("");
    setShowConfirm(true);
  }

  async function handlePayment() {
    setShowConfirm(false);
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          title,
          checkIn,
          checkOut,
          guests,
          nights,
          totalPrice,
          pricePerNight,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to start checkout");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  function formatDate(val: string) {
    return new Date(val).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <>
      <div className="sticky top-8 w-full lg:w-[380px] border border-border rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-white">
        <div className="flex items-baseline gap-1.5 mb-6">
          <span className="text-2xl font-bold text-navy">{pricePerNight} TND</span>
          <span className="text-sm text-text-muted">/ night</span>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red/10 border border-red/20 rounded-xl text-red text-xs font-medium">
            {error}
          </div>
        )}

        <div className="border border-border rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="p-3">
              <label className="block text-[10px] font-semibold uppercase tracking-[1px] text-text-muted mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full text-sm text-text outline-none"
              />
            </div>
            <div className="p-3">
              <label className="block text-[10px] font-semibold uppercase tracking-[1px] text-text-muted mb-1">
                Checkout
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split("T")[0]}
                className="w-full text-sm text-text outline-none"
              />
            </div>
          </div>
          <div className="border-t border-border p-3">
            <label className="block text-[10px] font-semibold uppercase tracking-[1px] text-text-muted mb-1">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full text-sm text-text outline-none bg-white"
            >
              {Array.from({ length: maxGuests }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} guest{i > 0 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleReserveClick}
          disabled={loading}
          className="w-full py-3.5 bg-red text-white rounded-xl text-[15px] font-semibold cursor-pointer hover:bg-red/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Redirecting to payment..." : "Reserve"}
        </button>

        {nights > 0 && (
          <div className="mt-5 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-text-muted">
              <span>{pricePerNight} TND × {nights} night{nights > 1 ? "s" : ""}</span>
              <span>{totalPrice} TND</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-semibold text-navy">
              <span>Total</span>
              <span>{totalPrice} TND</span>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-text-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          Secure payment via Stripe
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl mx-4">
            <h3 className="font-heading text-2xl font-bold text-navy mb-6">Confirm your booking</h3>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">Property</span>
                <span className="text-[15px] text-navy font-medium">{title}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">Check-in</span>
                  <span className="text-[15px] text-navy">{formatDate(checkIn)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">Checkout</span>
                  <span className="text-[15px] text-navy">{formatDate(checkOut)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">Guests</span>
                  <span className="text-[15px] text-navy">{guests} guest{guests > 1 ? "s" : ""}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-[1px] text-text-muted">Duration</span>
                  <span className="text-[15px] text-navy">{nights} night{nights > 1 ? "s" : ""}</span>
                </div>
              </div>
              <div className="border-t border-border pt-4 flex justify-between">
                <span className="text-[15px] font-semibold text-navy">Total</span>
                <span className="text-xl font-bold text-navy">{totalPrice} TND</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 border-[1.5px] border-border rounded-xl text-sm font-semibold text-text-muted cursor-pointer hover:border-navy hover:text-navy transition-colors"
              >
                Go back
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 py-3 bg-blue text-white rounded-xl text-sm font-semibold cursor-pointer hover:bg-navy transition-colors flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Pay with Stripe
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}