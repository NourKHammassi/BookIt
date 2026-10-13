import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [
    totalProperties,
    totalBookings,
    totalUsers,
    revenueResult,
    pendingCount,
    recentBookings,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.booking.count({ where: { status: { not: "CANCELLED" } } }),
    prisma.user.count(),
    prisma.booking.aggregate({
      _sum: { totalPrice: true },
      where: { status: { not: "CANCELLED" } },
    }),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: {
        property: { select: { title: true } },
        user: { select: { name: true, email: true } },
      },
    }),
  ]);

  const totalRevenue = revenueResult._sum.totalPrice || 0;

  const stats = [
    { label: "Properties", value: totalProperties, accent: "#2B5EA7" },
    { label: "Active Bookings", value: totalBookings, accent: "#E8A830" },
    { label: "Pending", value: pendingCount, accent: "#C4503D" },
    { label: "Revenue", value: `$${totalRevenue.toLocaleString()}`, accent: "#1A3654" },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-[28px] font-heading font-semibold text-[#1A3654] tracking-tight">
          Dashboard
        </h1>
        <p className="text-[13px] text-[#1A3654]/40 font-body mt-1">
          {totalUsers} registered users · {totalProperties} properties listed
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-5 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 border border-[#1A3654]/[0.04]"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#1A3654]/35 font-body font-semibold mb-4">
              {stat.label}
            </p>
            <p
              className="text-[32px] font-heading font-semibold leading-none"
              style={{ color: stat.accent }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-[#1A3654]/[0.04] overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h2 className="text-[17px] font-heading font-semibold text-[#1A3654]">
            Recent Bookings
          </h2>
          <Link
            href="/admin/bookings"
            className="text-[11px] font-body font-semibold text-[#2B5EA7]/70 no-underline hover:text-[#2B5EA7] transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="mt-2">
          <table className="w-full">
            <thead>
              <tr className="border-y border-[#1A3654]/[0.04]">
                {["Guest", "Property", "Dates", "Status", "Total"].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={`text-[10px] uppercase tracking-[0.15em] text-[#1A3654]/30 font-body font-semibold px-6 py-2.5 ${
                        i === 4 ? "text-right" : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-t border-[#1A3654]/[0.03] hover:bg-[#FAF7F2]/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-medium text-[#1A3654] font-body">
                      {booking.user.name || "—"}
                    </p>
                    <p className="text-[11px] text-[#1A3654]/30 font-body">
                      {booking.user.email}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#1A3654]/60 font-body">
                    {booking.property.title}
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
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-6 py-4 text-[13px] font-semibold text-[#1A3654] font-body text-right">
                    ${booking.totalPrice.toLocaleString()}
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-[13px] text-[#1A3654]/30 font-body"
                  >
                    No bookings yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
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