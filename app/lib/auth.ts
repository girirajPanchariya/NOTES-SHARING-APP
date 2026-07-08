import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getUserId() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded: any = verifyToken(token);

  return decoded.id;
}