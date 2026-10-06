import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/properties/seed — seed test data (dev only)
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@bookit.com" },
    update: {},
    create: {
      email: "admin@bookit.com",
      name: "Admin",
      password: "admin123",
      role: "ADMIN",
    },
  });

  // Create amenities
  const amenityNames = ["WiFi", "Pool", "Parking", "Air Conditioning", "Kitchen", "Beach Access"];
  for (const name of amenityNames) {
    await prisma.amenity.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  const amenities = await prisma.amenity.findMany();

  // Create properties
  const props = [
    {
      title: "Seaside Villa in Hammamet",
      description: "A luxurious beachfront villa with panoramic views of the Mediterranean Sea.",
      city: "Hammamet",
      country: "Tunisia",
      address: "Zone Touristique, Hammamet",
      pricePerNight: 120,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      images: ["/images/villa1.jpg"],
      featured: true,
    },
    {
      title: "Modern Apartment in Marsa",
      description: "Stylish city apartment close to restaurants and nightlife.",
      city: "La Marsa",
      country: "Tunisia",
      address: "Rue du Lac, La Marsa",
      pricePerNight: 75,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      images: ["/images/apt1.jpg"],
      featured: false,
    },
    {
      title: "Desert Retreat in Tozeur",
      description: "Unique desert experience with traditional architecture and palm gardens.",
      city: "Tozeur",
      country: "Tunisia",
      address: "Vieux Quartier, Tozeur",
      pricePerNight: 90,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      images: ["/images/desert1.jpg"],
      featured: true,
    },
  ];

  for (const p of props) {
    const existing = await prisma.property.findFirst({ where: { title: p.title } });
    if (!existing) {
      const property = await prisma.property.create({
        data: { ...p, ownerId: admin.id },
      });
      // Link random amenities
      const selected = amenities.slice(0, 3 + Math.floor(Math.random() * 3));
      for (const a of selected) {
        await prisma.propertyAmenity.create({
          data: { propertyId: property.id, amenityId: a.id },
        });
      }
    }
  }

  return NextResponse.json({ message: "Seeded successfully" });
}