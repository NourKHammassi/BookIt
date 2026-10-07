import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/properties — list all properties
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const guests = searchParams.get("guests");

  const properties = await prisma.property.findMany({
    where: {
      ...(city && { city: { contains: city, mode: "insensitive" as const } }),
      ...(guests && { maxGuests: { gte: parseInt(guests) } }),
    },
    include: {
      amenities: { include: { amenity: true } },
      reviews: { select: { rating: true } },
    },
    orderBy: { createdAt: "desc" },
  });

const result = properties.map((p: any) => ({
      ...p,
    avgRating:
      p.reviews.length > 0
        ? p.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / p.reviews.length
        : null,
    reviewCount: p.reviews.length,
  }));

  return NextResponse.json(result);
}