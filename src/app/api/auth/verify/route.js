import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "No ID token provided" }, { status: 400 });
    }

    // Verify token with LINE server
    const params = new URLSearchParams();
    params.append('id_token', idToken);
    params.append('client_id', process.env.LINE_CHANNEL_ID);

    const response = await fetch('https://api.line.me/oauth2/v2.1/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const data = await response.json();

    if (data.error) {
      console.error("LINE verify error:", data.error_description);
      return NextResponse.json({ error: data.error_description }, { status: 400 });
    }

    const { sub: lineId, name, picture: image, email } = data;

    // Upsert User in Database
    const user = await prisma.user.upsert({
      where: { lineId },
      update: {
        name,
        image,
        ...(email && { email }), // Update email if provided by LINE
      },
      create: {
        lineId,
        name,
        image,
        ...(email && { email }),
      },
    });

    // Create session JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role, lineId: user.lineId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set HTTP-Only Cookie
    const res = NextResponse.json({ success: true, user });
    res.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
