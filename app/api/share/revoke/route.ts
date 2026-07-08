import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    await prisma.shareLink.update({
      where: {
        token,
      },
      data: {
        revoked: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Share link revoked successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}