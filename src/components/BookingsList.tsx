"use client";

import { useState } from "react";
import Link from "next/link";

interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  property: {
    title: string;
    city: string;
    country: string;
    images: string[];
    pricePerNight: number;
  };
}

interface Props {
  bookings: Booking[];
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow/20 text-yellow",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red/10 text-red",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
};

export default function BookingsList({ bookings: initial }: Props) {
  const [bookings, setBookings] = useState(initial);
  const [cancelling, setCancelling] = useState<string | null>(null);

  async function handleCancel(id: string) {
    setCancelling(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: "CANCELLED" } : b))
        );
      }
    } catch {
      // silent fail
    }
    setCancelling(null);
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="flex gap-6 p-6 bg-white rounded-2xl border border-border hover:shadow-sm transition-shadow"
        >
          <div className="w-40 h-28 rounded-xl bg-gradient-to-br from-blue to-navy flex-shrink-0 overflow-hidden relative">
            {b.property.images[0] && (
              <ImageWithFallback src={b.property.images[0]} alt={b.property.title} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-navy truncate">
                  {b.property.title}
                </h3>
                <p className="text-sm text-text-muted mt-0.5">
                  {b.property.city}, {b.property.country}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${STATUS_STYLES[b.status] || ""}`}
              >
                {STATUS_LABELS[b.status] || b.status}
              </span>
            </div>

            <div className="flex items-center gap-6 mt-3 text-sm text-text-muted">
              <span>{formatDate(b.checkIn)} → {formatDate(b.checkOut)}</span>
              <span>{b.guests} guest{b.guests > 1 ? "s" : ""}</span>
              <span className="font-semibold text-navy">{b.totalPrice} TND</span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              {b.status === "PENDING" && (
                <button
                  onClick={() => handleCancel(b.id)}
                  disabled={cancelling === b.id}
                  className="px-4 py-2 text-xs font-semibold text-red border border-red/30 rounded-lg hover:bg-red/5 cursor-pointer transition-colors disabled:opacity-50"
                >
                  {cancelling === b.id ? "Cancelling..." : "Cancel booking"}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}