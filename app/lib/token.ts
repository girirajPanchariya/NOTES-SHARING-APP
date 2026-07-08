import crypto from "crypto";

export function generateToken(length = 32) {
  return crypto.randomBytes(length).toString("hex");
}

export function generateShortToken(length = 4) {
  return crypto.randomBytes(length).toString("hex");
}