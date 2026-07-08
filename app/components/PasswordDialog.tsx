"use client";

import { useState } from "react";

interface PasswordDialogProps {
  token: string;
  onUnlock: (note: any) => void;
}

export default function PasswordDialog({
  token,
  onUnlock,
}: PasswordDialogProps) {
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function unlock() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/share/${token}/unlock`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      onUnlock(data.note);
    } catch {
      setError("Unable to unlock");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        Password Protected
      </h2>

      <input
        type="password"
        placeholder="Access Password"
        className="border rounded w-full p-3"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      {error && (
        <p className="text-red-500 mt-3">
          {error}
        </p>
      )}

      <button
        onClick={unlock}
        disabled={loading}
        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
      >
        {loading
          ? "Checking..."
          : "Unlock Note"}
      </button>

    </div>
  );
}