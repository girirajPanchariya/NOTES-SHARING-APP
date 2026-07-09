import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/app/lib/auth";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/* ---------------- GET ---------------- */

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const userId = await getUserId();
    const { id } = await params;

    const note = await prisma.note.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        shareLinks: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!note) {
      return NextResponse.json(
        {
          message: "Note not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(note);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}

/* ---------------- UPDATE ---------------- */

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const userId = await getUserId();

    const { id } = await params;

    const body = await req.json();

    const note = await prisma.note.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!note) {
      return NextResponse.json(
        {
          message: "Note not found",
        },
        {
          status: 404,
        }
      );
    }

    const updated = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(updated);

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

/* ---------------- DELETE ---------------- */

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    const userId = await getUserId();

    const { id } = await params;

    const note = await prisma.note.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!note) {
      return NextResponse.json(
        {
          message: "Note not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.shareLink.deleteMany({
      where: {
        noteId: id,
      },
    });

    await prisma.note.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
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