import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { propertyId, title, checkIn, checkOut, guests, nights, totalPrice, pricePerNight } = body;

  if (!propertyId || !checkIn || !checkOut || !nights || !totalPrice) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              description: `${nights} night${nights > 1 ? "s" : ""} · ${checkIn} to ${checkOut} · ${guests} guest${guests > 1 ? "s" : ""}`,
            },
            unit_amount: Math.round(totalPrice * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        propertyId,
        userId: session.user.id,
        checkIn,
        checkOut,
        guests: String(guests),
        totalPrice: String(totalPrice),
      },
      success_url: `${process.env.NEXTAUTH_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/property/${propertyId}`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message || "Checkout failed" }, { status: 500 });
  }
}