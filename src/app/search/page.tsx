"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
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

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );
  const [guests, setGuests] = useState(searchParams.get("guests") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  function buildQuery() {
    const params = new URLSearchParams();
    if (location) params.set("city", location);
    if (guests) params.set("guests", guests);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (bedrooms) params.set("bedrooms", bedrooms);
    return params.toString();
  }

  function fetchProperties() {
    setLoading(true);
    fetch(`/api/properties?${buildQuery()}`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchProperties();
  }

  function handleClear() {
    setLocation("");
    setGuests("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setLoading(true);
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  return (
    <div>
      <Navbar />

      <div className="px-16 py-10 flex gap-10 min-h-screen">
        {/* Sidebar filters */}
        <aside className="w-72 shrink-0">
          <form onSubmit={handleSearch} className="sticky top-10">
            <h2 className="font-heading text-2xl font-semibold text-navy mb-6">
              Filters
            </h2>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-muted mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City name..."
                className="w-full px-4 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-text outline-none focus:border-blue transition-colors"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-muted mb-1.5">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-4 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-text outline-none focus:border-blue transition-colors bg-white"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="6">6+</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-muted mb-1.5">
                Price range (TND/night)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  className="w-1/2 px-3 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-text outline-none focus:border-blue transition-colors"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  className="w-1/2 px-3 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-text outline-none focus:border-blue transition-colors"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-text-muted mb-1.5">
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-4 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-text outline-none focus:border-blue transition-colors bg-white"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-body hover:bg-navy transition-colors mb-2"
            >
              Apply filters
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full py-3 bg-transparent text-text-muted border-[1.5px] border-border rounded-lg text-sm font-semibold cursor-pointer font-body hover:border-blue hover:text-blue transition-colors"
            >
              Clear all
            </button>
          </form>
        </aside>

        {/* Results */}
        <main className="flex-1">
          <div className="flex items-baseline justify-between mb-8">
            <h1 className="font-heading text-3xl font-semibold text-navy">
              {location
                ? `Stays in ${location}`
                : "All stays"}
            </h1>
            {!loading && (
              <span className="text-sm text-text-muted">
                {properties.length} propert{properties.length === 1 ? "y" : "ies"} found
              </span>
            )}
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : properties.length === 0 ? (
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
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <p className="text-lg font-medium text-text">No stays found</p>
              <p className="text-sm text-text-muted mt-1">
                Try adjusting your filters or search for a different location.
              </p>
              <button
                onClick={handleClear}
                className="mt-4 px-6 py-2.5 bg-blue text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-body hover:bg-navy transition-colors"
              >
                Clear filters
              </button>
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
                    {property.featured && (
                      <div className="absolute top-3 left-3 bg-yellow rounded-full px-2.5 py-1 text-xs font-semibold text-white">
                        Featured
                      </div>
                    )}
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
        </main>
      </div>

      <Footer />
    </div>
  );
}