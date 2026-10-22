"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend for contact yet — just show confirmation
    setSent(true);
  }

  const inputClass =
    "w-full px-4 py-3 border-[1.5px] border-border rounded-xl text-sm text-text outline-none focus:border-blue transition-colors font-body";

  return (
    <div>
      <Navbar />

      <div className="px-16 py-16 min-h-screen">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Left — info */}
          <div>
            <h1 className="font-heading text-4xl font-bold text-navy mb-4">
              Get in touch
            </h1>
            <p className="text-base text-text-muted leading-relaxed mb-10">
              Have a question about a property, need help with a booking, or
              want to list your place? We&apos;d love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B5EA7" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">Email</p>
                  <p className="text-sm text-text-muted mt-0.5">contact@bookit.tn</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red/10 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4503D" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">Phone</p>
                  <p className="text-sm text-text-muted mt-0.5">+216 71 123 456</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow/10 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8A830" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">Location</p>
                  <p className="text-sm text-text-muted mt-0.5">Tunis, Tunisia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_8px_rgba(0,0,0,0.06)] h-fit">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 mx-auto mb-4 bg-blue/10 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B5EA7" strokeWidth="2" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-navy mb-2">
                  Message sent!
                </h3>
                <p className="text-sm text-text-muted">
                  We&apos;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-heading text-xl font-semibold text-navy mb-2">
                  Send us a message
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-1.5">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="How can we help?"
                    rows={5}
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue text-white border-none rounded-xl text-sm font-semibold cursor-pointer font-body hover:bg-navy transition-colors"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}