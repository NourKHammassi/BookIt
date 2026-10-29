import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const guests = searchParams.get("guests");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const bedrooms = searchParams.get("bedrooms");

  try {
    const properties = await prisma.property.findMany({
      where: {
        ...(city && { city: { contains: city, mode: "insensitive" as const } }),
        ...(guests && { maxGuests: { gte: parseInt(guests) } }),
        ...(bedrooms && { bedrooms: { gte: parseInt(bedrooms) } }),
        ...(minPrice || maxPrice
          ? {
              pricePerNight: {
                ...(minPrice && { gte: parseFloat(minPrice) }),
                ...(maxPrice && { lte: parseFloat(maxPrice) }),
              },
            }
          : {}),
      },
      include: {
        reviews: {
          select: { rating: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = properties.map((p) => {
      const ratings = p.reviews.map((r) => r.rating);
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : null;

      return {
        id: p.id,
        title: p.title,
        city: p.city,
        country: p.country,
        maxGuests: p.maxGuests,
        bedrooms: p.bedrooms,
        pricePerNight: p.pricePerNight,
        images: p.images,
        avgRating,
        reviewCount: ratings.length,
        featured: p.featured,
        latitude: p.latitude,
        longitude: p.longitude,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}