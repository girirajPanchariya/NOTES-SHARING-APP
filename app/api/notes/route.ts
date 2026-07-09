import { prisma } from "@/lib/prisma";
import { getUserId } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId();

    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        {
          message: "Title and Content are required",
        },
        {
          status: 400,
        }
      );
    }

    const note = await prisma.note.create({
      data: {
        title: body.title,
        content: body.content,
        userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        note,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/notes Error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const userId = await getUserId();

    const notes = await prisma.note.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error("GET /api/notes Error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}