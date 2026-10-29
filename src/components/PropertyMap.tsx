"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

interface Property {
  id: string;
  title: string;
  city: string;
  pricePerNight: number;
  latitude: number | null;
  longitude: number | null;
  images: string[];
}

interface MapInnerProps {
  properties: Property[];
}

const MapInner = dynamic<MapInnerProps>(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-border/30 rounded-2xl flex items-center justify-center">
      <p className="text-sm text-text-muted">Loading map...</p>
    </div>
  ),
});

export default function PropertyMap({ properties }: { properties: Property[] }) {
  const mappable = properties.filter((p) => p.latitude && p.longitude);

  if (mappable.length === 0) return null;

  return (
    <div className="h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-border mb-6 md:mb-8">
      <MapInner properties={mappable} />
    </div>
  );
}