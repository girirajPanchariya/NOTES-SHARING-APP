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
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function unlock() {
    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `/api/share/${token}/unlock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Unable to unlock");
        return;
      }

      setPassword("");

      onUnlock(data.note);

    } catch (error) {
      console.error(error);
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Password Protected Note
      </h2>

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        disabled={loading}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
        className="border rounded-lg w-full p-3"
      />

      {error && (
        <p className="text-red-600 mt-3">
          {error}
        </p>
      )}

      <button
        onClick={unlock}
        disabled={loading}
        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg"
      >
        {loading ? "Unlocking..." : "Unlock Note"}
      </button>
    </div>
  );
}