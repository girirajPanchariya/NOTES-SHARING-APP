import { LoginUser, RegisterUser } from "../types/user";

const API = "/api/auth";

export async function registerUser(data: RegisterUser) {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function loginUser(data: LoginUser) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export function logoutUser() {
  localStorage.removeItem("token");
}