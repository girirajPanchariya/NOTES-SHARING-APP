import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();

  const hash = await bcrypt.hash(
    body.password,
    10
  );

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hash,
    },
  });

  return NextResponse.json(user);
}