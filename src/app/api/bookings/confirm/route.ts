import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId } = await request.json();
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const meta = checkoutSession.metadata!;

    if (meta.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId: meta.userId,
        propertyId: meta.propertyId,
        checkIn: new Date(meta.checkIn),
        checkOut: new Date(meta.checkOut),
      },
    });

    if (existingBooking) {
      return NextResponse.json({ booking: existingBooking });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: meta.userId,
        propertyId: meta.propertyId,
        checkIn: new Date(meta.checkIn),
        checkOut: new Date(meta.checkOut),
        guests: parseInt(meta.guests),
        totalPrice: parseFloat(meta.totalPrice),
        status: "CONFIRMED",
      },
    });

    return NextResponse.json({ booking });
  } catch (error: any) {
    console.error("Confirm error:", error);
    return NextResponse.json({ error: "Failed to confirm booking" }, { status: 500 });
  }
}