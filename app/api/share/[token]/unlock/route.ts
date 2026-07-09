import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await req.json();

    // Validate password
    if (!body.password || typeof body.password !== "string") {
      return NextResponse.json(
        {
          message: "Password is required",
        },
        {
          status: 400,
        }
      );
    }

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
          message: "Invalid Link",
        },
        {
          status: 404,
        }
      );
    }

    // Revoked
    if (share.revoked) {
      return NextResponse.json(
        {
          message: "Link Revoked",
        },
        {
          status: 403,
        }
      );
    }

    // Time expired
    if (
      share.shareType === "TIME" &&
      share.expiresAt &&
      new Date() > share.expiresAt
    ) {
      return NextResponse.json(
        {
          message: "Link Expired",
        },
        {
          status: 403,
        }
      );
    }

    // One time already used
    if (
      share.shareType === "ONE_TIME" &&
      share.used
    ) {
      return NextResponse.json(
        {
          message: "Link Already Used",
        },
        {
          status: 403,
        }
      );
    }

    // Must be password protected
    if (share.accessType !== "PASSWORD") {
      return NextResponse.json(
        {
          message: "This link does not require a password",
        },
        {
          status: 400,
        }
      );
    }

    const match = await bcrypt.compare(
      body.password,
      share.password || ""
    );

    if (!match) {
      return NextResponse.json(
        {
          message: "Wrong Password",
        },
        {
          status: 401,
        }
      );
    }

    // Atomic update
    const updated = await prisma.shareLink.updateMany({
      where: {
        id: share.id,
        revoked: false,
        ...(share.shareType === "ONE_TIME"
          ? {
              used: false,
            }
          : {}),
      },
      data: {
        viewCount: {
          increment: 1,
        },
        ...(share.shareType === "ONE_TIME"
          ? {
              used: true,
            }
          : {}),
      },
    });

    if (updated.count === 0) {
      return NextResponse.json(
        {
          message: "Link Already Used",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json({
      success: true,
      note: share.note,
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