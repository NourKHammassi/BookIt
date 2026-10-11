import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { propertyId, checkIn, checkOut, guests } = await request.json();

  if (!propertyId || !checkIn || !checkOut || !guests) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkOutDate <= checkInDate) {
    return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
  }

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  if (guests > property.maxGuests) {
    return NextResponse.json({ error: `Maximum ${property.maxGuests} guests allowed` }, { status: 400 });
  }

  // Check for overlapping bookings
  const overlap = await prisma.booking.findFirst({
    where: {
      propertyId,
      status: { not: "CANCELLED" },
      OR: [
        { checkIn: { lt: checkOutDate }, checkOut: { gt: checkInDate } },
      ],
    },
  });

  if (overlap) {
    return NextResponse.json({ error: "Property is not available for these dates" }, { status: 409 });
  }

  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = nights * property.pricePerNight;

  const booking = await prisma.booking.create({
    data: {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
      userId: session.user.id,
      propertyId,
    },
  });

  return NextResponse.json(booking, { status: 201 });
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      property: { select: { title: true, city: true, country: true, images: true, pricePerNight: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}