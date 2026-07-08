import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getUserId } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId();

    const body = await req.json();

    const note = await prisma.note.create({
      data: {
        title: body.title,
        content: body.content,
        expiry: new Date(body.expiry),
        shareType: body.shareType,
        accessType: body.accessType,
        userId,
      },
    });

    return NextResponse.json(note);
  } catch (err) {
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
  } catch (err) {
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