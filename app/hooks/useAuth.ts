"use client";

import { useEffect, useState } from "react";
import { User } from "../types/user";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        setLoading(false);
        return;
      }

      const data = await res.json();

      setUser(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);

      setUser(data.user);
    }

    return data;
  }

  async function register(
    name: string,
    email: string,
    password: string
  ) {
    const res = await fetch("/api/auth/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    return await res.json();
  }

  function logout() {
    localStorage.removeItem("token");

    setUser(null);

    window.location.href = "/login";
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    refresh: loadUser,
  };
}