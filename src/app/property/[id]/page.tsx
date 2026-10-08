import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyBookingCard from "@/components/PropertyBookingCard";
import PropertyReviews from "@/components/PropertyReviews";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      owner: { select: { name: true, image: true, createdAt: true } },
      amenities: { include: { amenity: true } },
      reviews: {
        include: { user: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!property) notFound();

  const avgRating =
    property.reviews.length > 0
      ? property.reviews.reduce((sum, r) => sum + r.rating, 0) /
        property.reviews.length
      : null;

  return (
    <div>
      <Navbar />

      <div className="px-16 py-10">
        {/* Title row */}
        <div className="mb-6">
          <h1 className="m-0 font-heading text-4xl font-bold text-navy">
            {property.title}
          </h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-text-muted">
            {avgRating && (
              <span className="flex items-center gap-1">
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
                <span>({property.reviews.length} review{property.reviews.length !== 1 ? "s" : ""})</span>
              </span>
            )}
            <span>·</span>
            <span>{property.city}, Tunisia</span>
          </div>
        </div>

        {/* Gallery */}
        <PropertyGallery images={property.images} title={property.title} />

        {/* Content + Booking sidebar */}
        <div className="flex gap-12 mt-10">
          {/* Left: details */}
          <div className="flex-1">
            {/* Host info */}
            <div className="flex items-center gap-4 pb-8 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center text-blue font-semibold text-lg">
                {property.owner.name?.[0] || "H"}
              </div>
              <div>
                <p className="m-0 text-base font-semibold text-text">
                  Hosted by {property.owner.name || "Host"}
                </p>
                <p className="m-0 text-sm text-text-muted mt-0.5">
                  {property.maxGuests} guest{property.maxGuests > 1 ? "s" : ""} · {property.bedrooms} bedroom{property.bedrooms > 1 ? "s" : ""} · {property.bathrooms} bathroom{property.bathrooms > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="py-8 border-b border-border">
              <h2 className="m-0 mb-4 font-heading text-2xl font-semibold text-navy">
                About this place
              </h2>
              <p className="m-0 text-base text-text leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="py-8 border-b border-border">
                <h2 className="m-0 mb-4 font-heading text-2xl font-semibold text-navy">
                  What this place offers
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.map((pa) => (
                    <div
                      key={pa.amenity.id}
                      className="flex items-center gap-3 py-2 text-sm text-text"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2B5EA7"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {pa.amenity.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <PropertyReviews
              propertyId={property.id}
              initialReviews={property.reviews.map((r) => ({
                ...r,
                createdAt: r.createdAt.toISOString(),
              }))}
              avgRating={avgRating}
            />
          </div>

          {/* Right: Booking card */}
          <PropertyBookingCard
            propertyId={property.id}
            pricePerNight={property.pricePerNight}
            avgRating={avgRating}
            reviewCount={property.reviews.length}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}