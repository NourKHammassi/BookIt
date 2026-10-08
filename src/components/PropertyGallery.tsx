"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export default function PropertyGallery({ images, title }: Props) {
  if (!images || images.length === 0) {
    return (
      <div className="h-[420px] rounded-2xl bg-gradient-to-br from-blue to-navy" />
    );
  }

  if (images.length === 1) {
    return (
      <div className="h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue to-navy relative">
        <GalleryImage src={images[0]} alt={title} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] rounded-2xl overflow-hidden">
      <div className="col-span-2 row-span-2 relative bg-gradient-to-br from-blue to-navy">
        <GalleryImage src={images[0]} alt={title} />
      </div>
      {images.slice(1, 5).map((img, i) => (
        <div
          key={i}
          className="relative bg-gradient-to-br from-blue to-navy"
        >
          <GalleryImage src={img} alt={`${title} ${i + 2}`} />
        </div>
      ))}
    </div>
  );
}