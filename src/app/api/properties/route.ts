import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const properties = await prisma.property.findMany({
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
            };
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json([], { status: 500 });
    }
}