"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setError("No session ID found");
      return;
    }

    fetch("/api/bookings/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.booking) {
          setStatus("success");
        } else {
          setStatus("error");
          setError(data.error || "Something went wrong");
        }
      })
      .catch(() => {
        setStatus("error");
        setError("Failed to confirm booking");
      });
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue/20 border-t-blue rounded-full animate-spin" />
        <p className="text-lg font-medium text-navy">Confirming your booking...</p>
        <p className="text-sm text-text-muted mt-1">Please wait while we verify your payment.</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="font-heading text-3xl font-bold text-navy mb-3">Booking confirmed!</h1>
        <p className="text-base text-text-muted mb-8">
          Your payment was successful and your stay is reserved. You&apos;ll find the details in your bookings page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => router.push("/bookings")} className="px-8 py-3 bg-blue text-white rounded-xl text-sm font-semibold cursor-pointer hover:bg-navy transition-colors">
            View my bookings
          </button>
          <button onClick={() => router.push("/search")} className="px-8 py-3 bg-transparent border-[1.5px] border-border text-text-muted rounded-xl text-sm font-semibold cursor-pointer hover:border-blue hover:text-blue transition-colors">
            Browse more stays
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center max-w-md">
      <div className="w-20 h-20 mx-auto mb-6 bg-red/10 rounded-full flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C4503D" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
      <h1 className="font-heading text-3xl font-bold text-navy mb-3">Something went wrong</h1>
      <p className="text-base text-text-muted mb-8">{error}</p>
      <button onClick={() => router.push("/search")} className="px-8 py-3 bg-blue text-white rounded-xl text-sm font-semibold cursor-pointer hover:bg-navy transition-colors">
        Back to search
      </button>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-8 lg:px-16 py-20 min-h-screen flex items-center justify-center">
        <Suspense fallback={
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue/20 border-t-blue rounded-full animate-spin" />
            <p className="text-lg font-medium text-navy">Loading...</p>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}