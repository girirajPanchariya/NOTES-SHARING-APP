import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const share = await prisma.shareLink.findUnique({
      where: { token },
      include: {
        note: true,
      },
    });

    if (!share) {
      return NextResponse.json(
        { message: "Invalid Share Link" },
        { status: 404 }
      );
    }

    if (share.revoked) {
      return NextResponse.json(
        { message: "Link Revoked" },
        { status: 403 }
      );
    }

    if (share.used) {
      return NextResponse.json(
        { message: "Link Already Used" },
        { status: 403 }
      );
    }

    if (
      share.shareType === "TIME" &&
      share.expiresAt &&
      new Date() > share.expiresAt
    ) {
      return NextResponse.json(
        { message: "Link Expired" },
        { status: 403 }
      );
    }

    if (share.accessType === "PASSWORD") {
      return NextResponse.json({
        passwordRequired: true,
      });
    }

    await prisma.shareLink.update({
      where: { id: share.id },
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