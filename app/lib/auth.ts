import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getUserId() {
  const cookieStore = await cookies();

  console.log("Cookies:", cookieStore.getAll());

  const token = cookieStore.get("token")?.value;

  console.log("Token:", token);

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const decoded = verifyToken(token) as { id: string };

    console.log("Decoded:", decoded);

    return decoded.id;
  } catch (err) {
    console.error(err);
    throw err;
  }
}