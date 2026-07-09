"use client";

import NoteForm from "@/app/components/NoteForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewNotePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function createNote(data: any) {
    try {
      setLoading(true);

      const res = await fetch("/api/notes", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Failed to create note");
        return;
      }

      // Works with either API response shape
      const noteId = result.note?.id || result.id;

      if (!noteId) {
        alert("Note ID not found");
        console.log(result);
        return;
      }

      router.push(`/notes/${noteId}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-green-50 text-black p-6 rounded-lg">
      <NoteForm
        onSubmit={createNote}
        loading={loading}
      />
    </div>
  );
}