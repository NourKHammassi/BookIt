"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Property {
  id: string;
  title: string;
  city: string;
  maxGuests: number;
  bedrooms: number;
  pricePerNight: number;
  avgRating: number | null;
  reviewCount: number;
  images: string[];
  featured: boolean;
}

function StarIcon() {
  return (
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
  );
}

export default function FeaturedStays() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="px-16 pt-20 pb-10">
      <div className="flex items-baseline justify-between mb-10">
        <div>
          <h2 className="m-0 font-heading text-4xl font-semibold text-blue">
            Featured stays
          </h2>
          <p className="mt-2 mb-0 text-base text-text-muted">
            Handpicked properties across Tunisia
          </p>
        </div>
        <Link
          href="/search"
          className="text-sm font-semibold text-red no-underline flex items-center gap-1.5 hover:underline"
        >
          View all
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="h-60 bg-border animate-pulse" />
              <div className="p-5">
                <div className="bg-border animate-pulse rounded h-5 w-3/4 mb-3" />
                <div className="bg-border animate-pulse rounded h-4 w-1/2 mb-3" />
                <div className="bg-border animate-pulse rounded h-5 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          <p className="text-lg font-medium">No properties yet</p>
          <p className="text-sm mt-1">
            Check back soon — new stays are added regularly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/property/${property.id}`}
              className="no-underline text-inherit rounded-2xl overflow-hidden bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform"
            >
              <div className="h-60 relative bg-gradient-to-br from-blue to-navy">
                {property.images?.[0] && (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-yellow rounded-full px-3 py-1 text-xs font-semibold text-white">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="m-0 text-[17px] font-semibold text-text font-heading">
                    {property.title}
                  </h3>
                  {property.avgRating && (
                    <div className="flex items-center gap-1">
                      <StarIcon />
                      <span className="text-sm font-semibold text-text">
                        {property.avgRating.toFixed(1)}
                      </span>
                      <span className="text-xs text-text-muted">
                        ({property.reviewCount})
                      </span>
                    </div>
                  )}
                </div>
                <p className="mt-1.5 mb-0 text-sm text-text-muted">
                  {property.city}
                  {property.maxGuests > 0 &&
                    ` · ${property.maxGuests} guest${property.maxGuests > 1 ? "s" : ""}`}
                  {property.bedrooms > 0 &&
                    ` · ${property.bedrooms} bedroom${property.bedrooms > 1 ? "s" : ""}`}
                </p>
                <p className="mt-3 mb-0 text-base font-bold text-blue">
                  {property.pricePerNight} TND{" "}
                  <span className="font-normal text-sm text-text-muted">
                    / night
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}