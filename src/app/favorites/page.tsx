"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FavoriteProperty {
  id: string;
  title: string;
  city: string;
  country: string;
  maxGuests: number;
  bedrooms: number;
  pricePerNight: number;
  images: string[];
  avgRating: number | null;
  reviewCount: number;
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

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [properties, setProperties] = useState<FavoriteProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetch("/api/favorites")
        .then((res) => res.json())
        .then((data) => {
          setProperties(data.favorites || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  async function handleRemove(e: React.MouseEvent, propertyId: string) {
    e.preventDefault();
    e.stopPropagation();
    if (removing) return;

    setRemoving(propertyId);
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });
      const data = await res.json();
      if (data.favorited) {
        // toggle went wrong direction, re-fetch
        const refresh = await fetch("/api/favorites");
        const refreshData = await refresh.json();
        setProperties(refreshData.favorites || []);
      }
    } catch {
      // re-fetch on error
      const refresh = await fetch("/api/favorites");
      const refreshData = await refresh.json();
      setProperties(refreshData.favorites || []);
    } finally {
      setRemoving(null);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div>
        <Navbar />
        <div className="px-16 py-10 min-h-screen">
          <h1 className="font-heading text-3xl font-semibold text-navy mb-8">
            My Favorites
          </h1>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
              >
                <div className="h-52 bg-border animate-pulse" />
                <div className="p-5">
                  <div className="bg-border animate-pulse rounded h-5 w-3/4 mb-3" />
                  <div className="bg-border animate-pulse rounded h-4 w-1/2 mb-3" />
                  <div className="bg-border animate-pulse rounded h-5 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="px-16 py-10 min-h-screen">
        <h1 className="font-heading text-3xl font-semibold text-navy mb-8">
          My Favorites
        </h1>

        {properties.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue/10 rounded-full flex items-center justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2B5EA7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-text">No favorites yet</p>
            <p className="text-sm text-text-muted mt-1">
              Start saving properties you love and they&apos;ll show up here.
            </p>
            <Link
              href="/search"
className="inline-block mt-4 px-6 py-2.5 bg-blue !text-white no-underline rounded-lg text-sm font-semibold hover:bg-navy transition-colors"            >
              Explore stays
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className="no-underline text-inherit rounded-2xl overflow-hidden bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform"
              >
                <div className="h-52 relative bg-gradient-to-br from-blue to-navy">
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
                  <button
                    onClick={(e) => handleRemove(e, property.id)}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center cursor-pointer border-none transition-all shadow-sm"
                    aria-label="Remove from favorites"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#C4503D"
                      stroke="#C4503D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="m-0 text-[16px] font-semibold text-text leading-snug font-heading">
                      {property.title}
                    </h3>
                    {property.avgRating && (
                      <div className="flex items-center gap-1 shrink-0">
                        <StarIcon />
                        <span className="text-sm font-semibold text-text">
                          {property.avgRating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="mt-1.5 mb-0 text-sm text-text-muted">
                    {property.city} · {property.maxGuests} guest
                    {property.maxGuests > 1 ? "s" : ""} · {property.bedrooms}{" "}
                    bedroom{property.bedrooms > 1 ? "s" : ""}
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
      </div>

      <Footer />
    </div>
  );
}