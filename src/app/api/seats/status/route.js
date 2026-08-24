import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get("tripId");

    if (!tripId) {
      return NextResponse.json({ success: false, error: "tripId is required" }, { status: 400 });
    }

    // 1. Get confirmed/pending booked seats
    const bookings = await prisma.booking.findMany({
      where: {
        tripId,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
      include: {
        passengers: true,
      },
    });

    const bookedSeats = bookings.flatMap((booking) =>
      booking.passengers.map((p) => p.seatNumber)
    );

    // 2. Get locked seats (where expiresAt > now)
    const activeLocks = await prisma.seatLock.findMany({
      where: {
        tripId,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    const lockedSeats = activeLocks.map((lock) => lock.seatNumber);

    // Filter out locks that are already in bookedSeats (just in case)
    const uniqueLockedSeats = lockedSeats.filter((seat) => !bookedSeats.includes(seat));

    return NextResponse.json({
      success: true,
      data: {
        bookedSeats,
        lockedSeats: uniqueLockedSeats,
      },
    });
  } catch (error) {
    console.error("Error fetching seat status:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
