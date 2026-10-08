import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { propertyId, rating, comment } = await request.json();

  if (!propertyId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // Check if user already reviewed this property
  const existing = await prisma.review.findFirst({
    where: { userId: session.user.id, propertyId },
  });

  if (existing) {
    return NextResponse.json(
      { error: "You already reviewed this property" },
      { status: 409 }
    );
  }

  const review = await prisma.review.create({
    data: {
      rating,
      comment: comment || "",
      userId: session.user.id,
      propertyId,
    },
    include: { user: { select: { name: true, image: true } } },
  });

  return NextResponse.json(review, { status: 201 });
}