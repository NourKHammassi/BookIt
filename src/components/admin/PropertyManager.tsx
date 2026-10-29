"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddPropertyForm from "./AddPropertyForm";
import EditPropertyForm from "./EditPropertyForm";

type Property = {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  bookingsCount: number;
  createdAt: string;
};

export default function PropertyManager({
  properties: initial,
}: {
  properties: Property[];
}) {
  const [properties, setProperties] = useState(initial);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [loadingEdit, setLoadingEdit] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/properties/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
        setConfirmId(null);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  }

  async function handleEdit(id: string) {
    setLoadingEdit(id);
    try {
      const res = await fetch(`/api/admin/properties/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEditData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEdit(null);
    }
  }

  return (
    <>
      <div className="flex justify-end mb-5">
        <button
          onClick={() => setShowAdd(true)}
          className="text-[12px] font-bold font-body text-white bg-[#2B5EA7] hover:bg-[#1A3654] px-5 py-2.5 rounded-xl cursor-pointer transition-colors"
        >
          + Add Property
        </button>
      </div>

      {showAdd && (
        <AddPropertyForm
          onClose={() => setShowAdd(false)}
          onSuccess={(newProp) => {
            setProperties((prev) => [newProp, ...prev]);
            setShowAdd(false);
            router.refresh();
          }}
        />
      )}

      {editData && (
        <EditPropertyForm
          property={editData}
          onClose={() => setEditData(null)}
          onSuccess={(updated) => {
            setProperties((prev) =>
              prev.map((p) =>
                p.id === updated.id
                  ? {
                      ...p,
                      title: updated.title,
                      location: `${updated.city}, ${updated.country}`,
                      pricePerNight: updated.pricePerNight,
                    }
                  : p
              )
            );
            setEditData(null);
            router.refresh();
          }}
        />
      )}

      <div className="bg-white rounded-2xl border border-[#1A3654]/[0.04] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1A3654]/[0.04]">
              {["Property", "Location", "Price/Night", "Bookings", ""].map(
                (h, i) => (
                  <th
                    key={i}
                    className={`text-[10px] uppercase tracking-[0.15em] text-[#1A3654]/30 font-body font-semibold px-6 py-3 ${
                      i >= 2 ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr
                key={property.id}
                className="border-t border-[#1A3654]/[0.03] hover:bg-[#FAF7F2]/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="text-[13px] font-medium text-[#1A3654] font-body">
                    {property.title}
                  </p>
                  <p className="text-[11px] text-[#1A3654]/30 font-body">
                    Added{" "}
                    {new Date(property.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </td>
                <td className="px-6 py-4 text-[13px] text-[#1A3654]/60 font-body">
                  {property.location}
                </td>
                <td className="px-6 py-4 text-[13px] font-semibold text-[#1A3654] font-body text-right">
                  {property.pricePerNight} TND
                </td>
                <td className="px-6 py-4 text-[13px] text-[#1A3654]/50 font-body text-right">
                  {property.bookingsCount}
                </td>
                <td className="px-6 py-4 text-right">
                  {confirmId === property.id ? (
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleDelete(property.id)}
                        disabled={deleting === property.id}
                        className="text-[11px] font-bold font-body text-white bg-[#C4503D] px-3 py-1.5 rounded-lg hover:bg-[#C4503D]/90 cursor-pointer transition-colors disabled:opacity-50"
                      >
                        {deleting === property.id ? "..." : "Yes, delete"}
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="text-[11px] font-semibold font-body text-[#1A3654]/30 hover:text-[#1A3654]/60 cursor-pointer transition-colors"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 justify-end">
                      <button
                        onClick={() => handleEdit(property.id)}
                        disabled={loadingEdit === property.id}
                        className="text-[11px] font-semibold font-body text-[#2B5EA7]/50 hover:text-[#2B5EA7] cursor-pointer transition-colors disabled:opacity-50"
                      >
                        {loadingEdit === property.id ? "..." : "Edit"}
                      </button>
                      <button
                        onClick={() => setConfirmId(property.id)}
                        className="text-[11px] font-semibold font-body text-[#C4503D]/40 hover:text-[#C4503D] cursor-pointer transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-[13px] text-[#1A3654]/30 font-body"
                >
                  No properties listed
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}