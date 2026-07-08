import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const note = await prisma.note.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!note) {
    return NextResponse.json(
      { message: "Not Found" },
      { status: 404 }
    );
  }

  return NextResponse.json(note);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.note.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}