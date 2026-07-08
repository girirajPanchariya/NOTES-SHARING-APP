import { NextRequest } from "next/server";
import { verifyToken } from "../lib/jwt";
export interface AuthUser {
  id: string;
}

export function getTokenFromRequest(req: NextRequest): string | null {
  // Authorization: Bearer <token>
  const authHeader = req.headers.get("authorization");

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  // Cookie
  const cookieToken = req.cookies.get("token")?.value;

  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

export function authenticate(req: NextRequest): AuthUser {
  const token = getTokenFromRequest(req);

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const payload = verifyToken(token);

    return {
      id: payload.id,
    };
  } catch {
    throw new Error("Invalid Token");
  }
}