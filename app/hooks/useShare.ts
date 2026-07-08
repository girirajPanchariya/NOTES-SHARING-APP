"use client";

import { useState } from "react";

export default function useShare() {
  const [loading, setLoading] = useState(false);

  async function createShare(
    noteId: string,
    shareType: "ONE_TIME" | "TIME",
    accessType: "PUBLIC" | "PASSWORD",
    expiresAt?: string
  ) {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/share/create", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          noteId,
          shareType,
          accessType,
          expiresAt,
        }),
      });

      return await res.json();
    } finally {
      setLoading(false);
    }
  }

  async function unlockShare(
    token: string,
    password: string
  ) {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/share/${token}/unlock`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            password,
          }),
        }
      );

      return await res.json();
    } finally {
      setLoading(false);
    }
  }

  async function revokeShare(token: string) {
    setLoading(true);

    try {
      const auth = localStorage.getItem("token");

      const res = await fetch(
        `/api/share/${token}/revoke`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      return await res.json();
    } finally {
      setLoading(false);
    }
  }

  async function getShare(token: string) {
    const res = await fetch(`/api/share/${token}`);

    return await res.json();
  }

  return {
    loading,
    createShare,
    unlockShare,
    revokeShare,
    getShare,
  };
}