import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { tripId, passengers, lineId, totalPrice = 0 } = body;

    if (!tripId || !passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    const seats = passengers.map(p => p.seatNumber).filter(Boolean);

    // 1. Check if seats are already booked (just in case the lock expired and someone else booked)
    const existingBookings = await prisma.booking.findMany({
      where: {
        tripId,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
      include: {
        passengers: true,
      }
    });

    const bookedSeats = existingBookings.flatMap(b => b.passengers.map(p => p.seatNumber));
    const isAnySeatBooked = seats.some(seat => bookedSeats.includes(seat));
    
    if (isAnySeatBooked) {
      return NextResponse.json({ success: false, error: "Some seats are already booked. Please try again." }, { status: 409 });
    }

    // 2. Create the Booking & Passengers
    // We will use a transaction to ensure both are created together
    const newBooking = await prisma.$transaction(async (tx) => {
      // Create Booking
      const booking = await tx.booking.create({
        data: {
          tripId,
          lineId,
          totalPrice,
          status: "PENDING",
          passengers: {
            create: passengers.map(p => ({
              name: p.name,
              idCard: p.idCard || "",
              phone: p.phone || "",
              seatNumber: p.seatNumber
            }))
          }
        },
        include: {
          passengers: true
        }
      });

      // Delete the seat locks for these seats since they are now booked
      if (seats.length > 0) {
        await tx.seatLock.deleteMany({
          where: {
            tripId,
            seatNumber: { in: seats }
          }
        });
      }

      return booking;
    });

    return NextResponse.json({
      success: true,
      data: newBooking,
      message: "Booking created successfully"
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
