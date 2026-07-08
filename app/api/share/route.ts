import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const token = crypto.randomBytes(32).toString("hex");

    let plainPassword: string | null = null;
    let hashedPassword: string | null = null;

    if (body.accessType === "PASSWORD") {
      plainPassword = crypto.randomBytes(4).toString("hex");
      hashedPassword = await bcrypt.hash(plainPassword, 10);
    }

    const share = await prisma.shareLink.create({
      data: {
        token,
        noteId: body.noteId,
        shareType: body.shareType,
        accessType: body.accessType,
        password: hashedPassword,
        expiresAt: body.expiresAt
          ? new Date(body.expiresAt)
          : null,
      },
    });

    return NextResponse.json({
      success: true,
      shareLink: `/share/${token}`,
      password: plainPassword,
      share,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}