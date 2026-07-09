import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/app/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { token } = await params;

    const share = await prisma.shareLink.findUnique({
      where: {
        token,
      },
      include: {
        note: true,
      },
    });

    if (!share) {
      return NextResponse.json(
        {
          message: "Share Link Not Found",
        },
        {
          status: 404,
        }
      );
    }

    // Only owner can revoke
    if (share.note.userId !== userId) {
      return NextResponse.json(
        {
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const updated = await prisma.shareLink.update({
      where: {
        token,
      },
      data: {
        revoked: true,
      },
    });

    return NextResponse.json({
      success: true,
      share: updated,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}