import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingsList from "@/components/BookingsList";

export default async function BookingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      property: {
        select: { title: true, city: true, country: true, images: true, pricePerNight: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <main className="flex-1 px-16 py-12">
        <h1 className="font-heading text-4xl font-bold text-navy mb-8">My bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-text-muted mb-4">No bookings yet</p>
            <a
              href="/search"
              className="inline-block px-6 py-3 bg-blue text-white rounded-xl text-sm font-semibold no-underline hover:bg-navy transition-colors"
            >
              Explore properties
            </a>
          </div>
        ) : (
          <BookingsList
            bookings={bookings.map((b) => ({
              ...b,
              checkIn: b.checkIn.toISOString(),
              checkOut: b.checkOut.toISOString(),
              createdAt: b.createdAt.toISOString(),
              updatedAt: b.updatedAt.toISOString(),
            }))}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}