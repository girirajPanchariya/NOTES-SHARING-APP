import { hashPassword } from "./bcrypt";

export async function createSharePassword() {
  const password = Math.random()
    .toString(36)
    .substring(2, 8);

  const hash = await hashPassword(password);

  return {
    password,
    hash,
  };
}