"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Props {
  propertyId: string;
  favoriteIds?: string[];
}

export default function HeartButton({ propertyId, favoriteIds }: Props) {
  const { data: session } = useSession();
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (favoriteIds) {
      setFavorited(favoriteIds.includes(propertyId));
    }
  }, [favoriteIds, propertyId]);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) return;
    if (loading) return;

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
      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center cursor-pointer border-none transition-all shadow-sm"
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={favorited ? "#C4503D" : "none"}
        stroke={favorited ? "#C4503D" : "#1A3654"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}