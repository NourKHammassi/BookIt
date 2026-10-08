"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
  propertyId: string;
  onReviewAdded: () => void;
}

export default function ReviewForm({ propertyId, onReviewAdded }: Props) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!session) {
    return (
      <div className="p-5 rounded-xl border border-border text-center">
        <p className="m-0 text-sm text-text-muted">
          <Link href="/login" className="text-blue font-semibold no-underline hover:underline">
            Log in
          </Link>{" "}
          to leave a review.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId, rating, comment }),
    });

    if (res.ok) {
      setRating(0);
      setComment("");
      onReviewAdded();
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 rounded-xl border border-border">
      <h3 className="m-0 mb-4 font-heading text-lg font-semibold text-navy">
        Write a review
      </h3>

      {/* Star selector */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="bg-transparent border-none cursor-pointer p-0"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={star <= (hoverRating || rating) ? "#C4503D" : "none"}
              stroke="#C4503D"
              strokeWidth="1.5"
            >
              <polygon points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9" />
            </svg>
          </button>
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        rows={3}
        className="w-full px-4 py-3 border-[1.5px] border-border rounded-lg text-sm text-text outline-none focus:border-blue transition-colors resize-none font-body mb-4"
      />

      {error && (
        <p className="m-0 mb-3 text-sm text-red font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 bg-blue text-white border-none rounded-lg text-sm font-semibold cursor-pointer font-body hover:bg-navy transition-colors disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}