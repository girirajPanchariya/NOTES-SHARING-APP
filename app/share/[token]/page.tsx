"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PasswordDialog from "@/app/components/PasswordDialog";

interface Note {
  title: string;
  content: string;
}

export default function SharePage() {
  const params = useParams();

  const token = params.token as string;

  const [loading, setLoading] = useState(true);

  const [note, setNote] =
    useState<Note | null>(null);

  const [passwordRequired, setPasswordRequired] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (token) {
      loadShare();
    }
  }, [token]);

  async function loadShare() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `/api/share/${token}`
      );

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

    } catch (error) {
      console.error(error);

      setError("Unable to load note");
    } finally {
      setLoading(false);
    }
  }

  function onUnlock(note: Note) {
    setPasswordRequired(false);
    setNote(note);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-20 border rounded-xl p-6">

        <h2 className="text-2xl font-bold text-red-600">
          Error
        </h2>

        <p className="mt-3">
          {error}
        </p>

      </div>
    );
  }

  if (passwordRequired) {
    return (
      <div className="mt-20">

        <PasswordDialog
          token={token}
          onUnlock={onUnlock}
        />

      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center mt-20">
        Note not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12">

      <div className="border rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold">
          {note.title}
        </h1>

        <hr className="my-5" />

        <div className="whitespace-pre-wrap leading-7">
          {note.content}
        </div>

      </div>

    </div>
  );
}