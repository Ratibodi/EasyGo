import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const LOCK_DURATION_MINUTES = 10;

export async function POST(request) {
  try {
    const body = await request.json();
    const { tripId, seats } = body;

    if (!tripId || !seats || !Array.isArray(seats) || seats.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    // Check if any of the requested seats are already booked
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

    const isAnySeatBooked = seats.some((seat) => bookedSeats.includes(seat));
    if (isAnySeatBooked) {
      return NextResponse.json({ success: false, error: "Some seats are already booked" }, { status: 409 });
    }

    // Check if any of the requested seats are already locked by someone else
    const activeLocks = await prisma.seatLock.findMany({
      where: {
        tripId,
        seatNumber: { in: seats },
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (activeLocks.length > 0) {
      return NextResponse.json({ success: false, error: "Some seats are currently locked by another user" }, { status: 409 });
    }

    // Create locks
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + LOCK_DURATION_MINUTES);

    const lockData = seats.map((seatNumber) => ({
      tripId,
      seatNumber,
      expiresAt,
    }));

    await prisma.seatLock.createMany({
      data: lockData,
    });

    return NextResponse.json({
      success: true,
      message: `Seats locked successfully for ${LOCK_DURATION_MINUTES} minutes`,
    });
  } catch (error) {
    console.error("Error locking seats:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
