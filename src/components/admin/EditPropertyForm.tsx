"use client";

import { useState } from "react";
import ImageUploader from "../ImageUploader";

type PropertyData = {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  address: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  latitude: number | null;
  longitude: number | null;
};

export default function EditPropertyForm({
  property,
  onClose,
  onSuccess,
}: {
  property: PropertyData;
  onClose: () => void;
  onSuccess: (updated: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>(property.images || []);
  const [form, setForm] = useState({
    title: property.title,
    description: property.description || "",
    city: property.city,
    country: property.country,
    address: property.address || "",
    pricePerNight: String(property.pricePerNight),
    maxGuests: String(property.maxGuests),
    bedrooms: String(property.bedrooms),
    bathrooms: String(property.bathrooms),
    latitude: property.latitude ? String(property.latitude) : "",
    longitude: property.longitude ? String(property.longitude) : "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.title || !form.city || !form.country || !form.pricePerNight) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, images }),
      });

      if (res.ok) {
        const updated = await res.json();
        onSuccess(updated);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update property");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 text-[13px] font-body text-[#1A3654] bg-[#FAF7F2]/60 border border-[#1A3654]/10 rounded-xl outline-none focus:border-[#2B5EA7]/40 focus:bg-white transition-colors placeholder:text-[#1A3654]/25";
  const labelClass =
    "block text-[11px] uppercase tracking-[0.12em] text-[#1A3654]/40 font-body font-semibold mb-1.5";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-[#1A3654]/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto">
        <div className="px-7 pt-7 pb-4 border-b border-[#1A3654]/[0.04]">
          <h2 className="text-[20px] font-heading font-semibold text-[#1A3654]">Edit Property</h2>
          <p className="text-[12px] text-[#1A3654]/35 font-body mt-1">Update listing details</p>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-5 space-y-4">
          {error && (
            <p className="text-[12px] font-body font-semibold text-[#C4503D] bg-[#C4503D]/6 px-4 py-2.5 rounded-xl">{error}</p>
          )}

          <div>
            <label className={labelClass}>Photos</label>
            <ImageUploader images={images} onChange={setImages} max={5} />
          </div>

          <div>
            <label className={labelClass}>Title *</label>
            <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Desert Retreat in Tozeur" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="A beautiful property..." rows={3} className={`${inputClass} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>City *</label>
              <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Tozeur" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Country *</label>
              <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} placeholder="Tunisia" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Address</label>
            <input type="text" value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="123 Main Street" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Price/Night (TND) *</label>
              <input type="number" value={form.pricePerNight} onChange={(e) => update("pricePerNight", e.target.value)} placeholder="90" min="1" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Max Guests</label>
              <input type="number" value={form.maxGuests} onChange={(e) => update("maxGuests", e.target.value)} min="1" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Bedrooms</label>
              <input type="number" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} min="1" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Bathrooms</label>
              <input type="number" value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} min="1" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Latitude</label>
              <input type="number" step="any" value={form.latitude} onChange={(e) => update("latitude", e.target.value)} placeholder="36.8065" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Longitude</label>
              <input type="number" step="any" value={form.longitude} onChange={(e) => update("longitude", e.target.value)} placeholder="10.1815" className={inputClass} />
            </div>
          </div>

          <div className="flex gap-3 pt-3 pb-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 text-[13px] font-semibold font-body text-[#1A3654]/40 hover:text-[#1A3654]/70 rounded-xl border border-[#1A3654]/10 hover:border-[#1A3654]/20 cursor-pointer transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 text-[13px] font-bold font-body text-white bg-[#2B5EA7] hover:bg-[#1A3654] rounded-xl cursor-pointer transition-colors disabled:opacity-50">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}