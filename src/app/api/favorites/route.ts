import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/favorites — list user's favorites (full data or IDs only)
export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ favorites: [], ids: [] });
  }

  const { searchParams } = new URL(request.url);
  const idsOnly = searchParams.get("idsOnly") === "true";

  if (idsOnly) {
    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      select: { propertyId: true },
    });
    return NextResponse.json({ ids: favorites.map((f) => f.propertyId) });
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      property: {
        include: {
          reviews: { select: { rating: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const result = favorites.map((f) => {
    const ratings = f.property.reviews.map((r) => r.rating);
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : null;
    return {
      id: f.property.id,
      title: f.property.title,
      city: f.property.city,
      country: f.property.country,
      maxGuests: f.property.maxGuests,
      bedrooms: f.property.bedrooms,
      pricePerNight: f.property.pricePerNight,
      images: f.property.images,
      avgRating,
      reviewCount: ratings.length,
      favoritedAt: f.createdAt,
    };
  });

  return NextResponse.json({ favorites: result });
}

// POST /api/favorites — toggle favorite
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { propertyId } = await request.json();
  if (!propertyId) {
    return NextResponse.json({ error: "Property ID required" }, { status: 400 });
  }

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_propertyId: {
        userId: session.user.id,
        propertyId,
      },
    },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return NextResponse.json({ favorited: false });
  } else {
    await prisma.favorite.create({
      data: { userId: session.user.id, propertyId },
    });
    return NextResponse.json({ favorited: true });
  }
}