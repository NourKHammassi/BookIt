import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div>
      <Navbar />

      <div className="px-16 py-16 max-w-4xl mx-auto min-h-screen">
        <h1 className="font-heading text-4xl font-bold text-navy mb-4">
          About BookIt
        </h1>
        <p className="text-lg text-text-muted mb-10 leading-relaxed">
          BookIt is a modern booking platform connecting travelers with unique
          stays across Tunisia — from coastal apartments to desert retreats.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
            <div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B5EA7" strokeWidth="2" strokeLinecap="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-navy mb-2">Unique Properties</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Curated listings from trusted hosts — each one verified for quality,
              comfort, and authenticity.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
            <div className="w-12 h-12 rounded-full bg-red/10 flex items-center justify-center mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4503D" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-navy mb-2">Across Tunisia</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              From Sidi Bou Said to Tozeur, Hammamet to Djerba — discover stays
              in every corner of the country.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
            <div className="w-12 h-12 rounded-full bg-yellow/10 flex items-center justify-center mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8A830" strokeWidth="2" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-navy mb-2">Book With Confidence</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Instant booking confirmations, transparent pricing, and real
              reviews from verified guests.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="font-heading text-2xl font-semibold text-navy mb-4">
            How it works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue flex items-center justify-center text-white text-sm font-bold shrink-0">
                1
              </div>
              <div>
                <h4 className="font-heading text-base font-semibold text-navy mb-1">Search</h4>
                <p className="text-sm text-text-muted">Browse properties by city, dates, guests, and budget.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue flex items-center justify-center text-white text-sm font-bold shrink-0">
                2
              </div>
              <div>
                <h4 className="font-heading text-base font-semibold text-navy mb-1">Book</h4>
                <p className="text-sm text-text-muted">Pick your dates, confirm your stay, and get instant confirmation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue flex items-center justify-center text-white text-sm font-bold shrink-0">
                3
              </div>
              <div>
                <h4 className="font-heading text-base font-semibold text-navy mb-1">Enjoy</h4>
                <p className="text-sm text-text-muted">Check in, relax, and leave a review to help future travelers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}