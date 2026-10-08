"use client";

import { useState } from "react";
import ReviewForm from "./ReviewForm";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { name: string | null; image: string | null };
}

interface Props {
  propertyId: string;
  initialReviews: Review[];
  avgRating: number | null;
}

export default function PropertyReviews({
  propertyId,
  initialReviews,
  avgRating,
}: Props) {
  const [reviews, setReviews] = useState(initialReviews);

  async function refreshReviews() {
    const res = await fetch(`/api/properties/${propertyId}/reviews`);
    if (res.ok) {
      const data = await res.json();
      setReviews(data);
    }
  }

  return (
    <div className="py-8">
      <h2 className="m-0 mb-6 font-heading text-2xl font-semibold text-navy">
        Reviews
        {avgRating && (
          <span className="text-lg font-normal text-text-muted ml-2">
            · {avgRating.toFixed(1)} avg
          </span>
        )}
      </h2>

      {/* Review form */}
      <div className="mb-8">
        <ReviewForm propertyId={propertyId} onReviewAdded={refreshReviews} />
      </div>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="text-sm text-text-muted">No reviews yet. Be the first!</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-xl border border-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-red/10 flex items-center justify-center text-red font-semibold text-sm">
                  {review.user.name?.[0] || "U"}
                </div>
                <div>
                  <p className="m-0 text-sm font-semibold text-text">
                    {review.user.name || "Guest"}
                  </p>
                  <p className="m-0 text-xs text-text-muted">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={i < review.rating ? "#C4503D" : "none"}
                    stroke="#C4503D"
                    strokeWidth="1.5"
                  >
                    <polygon points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9" />
                  </svg>
                ))}
              </div>
              <p className="m-0 text-sm text-text leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}