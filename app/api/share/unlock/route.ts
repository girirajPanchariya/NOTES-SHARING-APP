import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await req.json();

    const share = await prisma.shareLink.findUnique({
      where: { token },
      include: {
        note: true,
      },
    });

    if (!share) {
      return NextResponse.json(
        { message: "Invalid Link" },
        { status: 404 }
      );
    }

    if (share.revoked || share.used) {
      return NextResponse.json(
        { message: "Link Not Available" },
        { status: 403 }
      );
    }

    const match = await bcrypt.compare(
      body.password,
      share.password!
    );

    if (!match) {
      return NextResponse.json(
        { message: "Wrong Password" },
        { status: 401 }
      );
    }

    await prisma.shareLink.update({
      where: {
        id: share.id,
      },
      data: {
        viewCount: {
          increment: 1,
        },
        ...(share.shareType === "ONE_TIME"
          ? { used: true }
          : {}),
      },
    });

    return NextResponse.json({
      note: share.note,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}