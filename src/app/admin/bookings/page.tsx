import { prisma } from "@/lib/prisma";
import BookingManager from "@/components/admin/BookingManager";

export default async function AdminBookings() {
  const bookings = await prisma.booking.findMany({
    include: {
      property: { select: { title: true } },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const serialized = bookings.map((b) => ({
    id: b.id,
    checkIn: b.checkIn.toISOString(),
    checkOut: b.checkOut.toISOString(),
    guests: b.guests,
    totalPrice: b.totalPrice,
    status: b.status,
    createdAt: b.createdAt.toISOString(),
    propertyTitle: b.property.title,
    userName: b.user.name || "—",
    userEmail: b.user.email || "",
  }));

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-[28px] font-heading font-semibold text-[#1A3654] tracking-tight">
          Bookings
        </h1>
        <p className="text-[13px] text-[#1A3654]/40 font-body mt-1">
          {bookings.length} total reservations
        </p>
      </div>
      <BookingManager bookings={serialized} />
    </div>
  );
}