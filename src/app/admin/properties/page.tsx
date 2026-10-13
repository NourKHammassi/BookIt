import { prisma } from "@/lib/prisma";
import PropertyManager from "@/components/admin/PropertyManager";

export default async function AdminProperties() {
  const properties = await prisma.property.findMany({
    include: {
      _count: { select: { bookings: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const serialized = properties.map((p) => ({
    id: p.id,
    title: p.title,
    location: `${p.city}, ${p.country}`,
    pricePerNight: p.pricePerNight,
    bookingsCount: p._count.bookings,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-[28px] font-heading font-semibold text-[#1A3654] tracking-tight">
          Properties
        </h1>
        <p className="text-[13px] text-[#1A3654]/40 font-body mt-1">
          {properties.length} properties listed
        </p>
      </div>
      <PropertyManager properties={serialized} />
    </div>
  );
}