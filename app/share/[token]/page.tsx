"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Note {
  title: string;
  content: string;
}

export default function SharePage() {
  const { token } = useParams<{ token: string }>();

  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [note, setNote] = useState<Note | null>(null);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      loadShare();
    }
  }, [token]);

  async function loadShare() {
    setLoading(true);

    try {
      const res = await fetch(`/api/share/${token}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      if (data.passwordRequired) {
        setPasswordRequired(true);
        return;
      }

      setNote(data.note);
    } catch {
      setError("Unable to load share.");
    } finally {
      setLoading(false);
    }
  }

  async function unlock() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/share/${token}/unlock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setPasswordRequired(false);
      setNote(data.note);
    } catch {
      setError("Unable to unlock note.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-20 text-lg">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
        <h2 className="text-xl font-bold text-red-600 mb-3">
          Error
        </h2>

        <p>{error}</p>
      </div>
    );
  }

  if (passwordRequired) {
    return (
      <div className="max-w-md mx-auto mt-20 border rounded-lg p-6">

        <h1 className="text-2xl font-bold mb-5">
          Password Protected Note
        </h1>

        <input
          type="password"
          placeholder="Enter Access Password"
          className="border rounded w-full p-3 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={unlock}
          className="bg-blue-600 text-white px-5 py-3 rounded w-full"
        >
          Unlock
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">

      <div className="border rounded-lg shadow p-6">

        <h1 className="text-3xl font-bold mb-4">
          {note?.title}
        </h1>

        <hr className="mb-4" />

        <div className="whitespace-pre-wrap leading-7">
          {note?.content}
        </div>

      </div>
    </div>
  );
}