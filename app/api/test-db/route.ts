import { prisma } from "@/lib/prisma";

    export async function GET() {
    try {
        await prisma.$connect();

        return Response.json({
        success: true,
        message: "Database connected successfully ✅"
        });

    } catch (error) {

        return Response.json({
        success: false,
        message: "Database connection failed ❌",
        error: error
        });
    }
    }