import { clsx } from "clsx";

export function cn(...inputs: any[]) {
  return clsx(inputs);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function isExpired(date: Date | null) {
  if (!date) return false;

  return new Date() > date;
}

export function randomString(length = 10) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}