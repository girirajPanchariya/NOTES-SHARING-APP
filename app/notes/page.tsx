"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NoteCard from "@/app/components/NoteCard";

interface ShareLink {
  token: string;
  accessType: "PUBLIC" | "PASSWORD";
  shareType: "ONE_TIME" | "TIME";
  viewCount: number;
  revoked: boolean;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  shareLinks?: ShareLink[];
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      setLoading(true);

      const res = await fetch("/api/notes", {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to load notes");
        return;
      }

      setNotes(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote(id: string) {
    const ok = confirm("Delete this note?");

    if (!ok) return;

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-center text-xl">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-bold">
          My Notes
        </h1>

        <Link
          href="/notes/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + New Note
        </Link>

      </div>

      {notes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 text-lg">
            No notes found.
          </p>

          <Link
            href="/notes/new"
            className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
          >
            Create First Note
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={deleteNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}