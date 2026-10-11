import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Props) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { property: true },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  // User can cancel their own booking, admin/owner can confirm or cancel
  const isOwner = booking.property.ownerId === session.user.id;
  const isGuest = booking.userId === session.user.id;
  const isAdmin = (session.user as any).role === "ADMIN";

  if (status === "CANCELLED" && !isGuest && !isOwner && !isAdmin) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  if (status === "CONFIRMED" && !isOwner && !isAdmin) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}