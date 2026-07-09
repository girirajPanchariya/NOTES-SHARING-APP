import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/app/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "Invalid credentials",
      },
      {
        status: 401,
      }
    );
  }

  const match = await bcrypt.compare(
    body.password,
    user.password
  );

  if (!match) {
    return NextResponse.json(
      {
        message: "Invalid credentials",
      },
      {
        status: 401,
      }
    );
  }

  const token = generateToken(user.id);

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}