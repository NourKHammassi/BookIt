"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  propertyTitle: string;
  userName: string;
  userEmail: string;
};

export default function BookingManager({
  bookings: initial,
}: {
  bookings: Booking[];
}) {
  const [bookings, setBookings] = useState(initial);
  const [filter, setFilter] = useState<string>("ALL");
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  const filtered =
    filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  const counts = {
    ALL: bookings.length,
    PENDING: bookings.filter((b) => b.status === "PENDING").length,
    CONFIRMED: bookings.filter((b) => b.status === "CONFIRMED").length,
    CANCELLED: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  }

  const filters = ["ALL", "PENDING", "CONFIRMED", "CANCELLED"] as const;

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex gap-1.5 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[11px] font-semibold font-body px-4 py-2 rounded-full cursor-pointer transition-all duration-200 ${
              filter === f
                ? "bg-[#1A3654] text-white shadow-sm"
                : "bg-white text-[#1A3654]/40 border border-[#1A3654]/[0.06] hover:text-[#1A3654]/70 hover:border-[#1A3654]/15"
            }`}
          >
            {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
            <span className="ml-1.5 opacity-50">
              {counts[f as keyof typeof counts]}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#1A3654]/[0.04] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1A3654]/[0.04]">
              {["Guest", "Property", "Dates", "Guests", "Status", "Total", "Actions"].map(
                (h, i) => (
                  <th
                    key={h}
                    className={`text-[10px] uppercase tracking-[0.15em] text-[#1A3654]/30 font-body font-semibold px-6 py-3 ${
                      i >= 5 ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((booking) => (
              <tr
                key={booking.id}
                className="border-t border-[#1A3654]/[0.03] hover:bg-[#FAF7F2]/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="text-[13px] font-medium text-[#1A3654] font-body">
                    {booking.userName}
                  </p>
                  <p className="text-[11px] text-[#1A3654]/30 font-body">
                    {booking.userEmail}
                  </p>
                </td>
                <td className="px-6 py-4 text-[13px] text-[#1A3654]/60 font-body max-w-[180px] truncate">
                  {booking.propertyTitle}
                </td>
                <td className="px-6 py-4">
                  <p className="text-[13px] text-[#1A3654]/60 font-body">
                    {new Date(booking.checkIn).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                    {" — "}
                    {new Date(booking.checkOut).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </td>
                <td className="px-6 py-4 text-[13px] text-[#1A3654]/50 font-body">
                  {booking.guests}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-6 py-4 text-[13px] font-semibold text-[#1A3654] font-body text-right">
                  ${booking.totalPrice.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center gap-3 justify-end">
                    {booking.status === "PENDING" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(booking.id, "CONFIRMED")
                          }
                          disabled={updating === booking.id}
                          className="text-[11px] font-bold font-body text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors disabled:opacity-40"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(booking.id, "CANCELLED")
                          }
                          disabled={updating === booking.id}
                          className="text-[11px] font-semibold font-body text-[#C4503D]/40 hover:text-[#C4503D] cursor-pointer transition-colors disabled:opacity-40"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === "CONFIRMED" && (
                      <button
                        onClick={() =>
                          updateStatus(booking.id, "CANCELLED")
                        }
                        disabled={updating === booking.id}
                        className="text-[11px] font-semibold font-body text-[#C4503D]/40 hover:text-[#C4503D] cursor-pointer transition-colors disabled:opacity-40"
                      >
                        Cancel
                      </button>
                    )}
                    {booking.status === "CANCELLED" && (
                      <span className="text-[11px] text-[#1A3654]/20 font-body">
                        —
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-[13px] text-[#1A3654]/30 font-body"
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string }> = {
    PENDING: { bg: "bg-[#E8A830]/8", text: "text-[#D49520]" },
    CONFIRMED: { bg: "bg-emerald-400/8", text: "text-emerald-600" },
    CANCELLED: { bg: "bg-[#C4503D]/8", text: "text-[#C4503D]" },
  };
  const c = config[status] || { bg: "", text: "" };

  return (
    <span
      className={`inline-block px-2.5 py-[3px] rounded-full text-[10px] font-bold font-body tracking-wide ${c.bg} ${c.text}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}