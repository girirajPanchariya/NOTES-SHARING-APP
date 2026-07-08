import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    await prisma.$connect();

    return Response.json({
      message: "Database connected successfully ✅"
    });

  } catch (error) {
    return Response.json({
      message: "Database connection failed ❌",
      error
    });
  }
}