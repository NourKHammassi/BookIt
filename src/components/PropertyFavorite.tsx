"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function PropertyFavorite({ propertyId }: { propertyId: string }) {
  const { data: session } = useSession();
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/favorites?idsOnly=true")
        .then((res) => res.json())
        .then((data) => {
          if (data.ids?.includes(propertyId)) setFavorited(true);
        })
        .catch(() => {});
    }
  }, [session, propertyId]);

  async function toggle() {
    if (!session?.user || loading) return;
    setLoading(true);
    setFavorited((prev) => !prev);

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });
      const data = await res.json();
      setFavorited(data.favorited);
    } catch {
      setFavorited((prev) => !prev);
    } finally {
      setLoading(false);
    }
  }

  if (!session?.user) return null;

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-blue text-sm font-semibold text-text cursor-pointer bg-white transition-colors"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={favorited ? "#C4503D" : "none"}
        stroke={favorited ? "#C4503D" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {favorited ? "Saved" : "Save"}
    </button>
  );
}