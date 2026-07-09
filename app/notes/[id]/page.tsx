"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ShareForm from "@/app/components/ShareForm";

export default function NoteDetails() {
  const params = useParams();
  const id = params.id as string;

  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadNote();
    }
  }, [id]);

  async function loadNote() {
    try {
      setLoading(true);

      const res = await fetch(`/api/notes/${id}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setNote(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load note");
    } finally {
      setLoading(false);
    }
  }

  async function revoke(token: string) {
    const ok = confirm("Revoke this share link?");

    if (!ok) return;

    const res = await fetch(
      `/api/share/${token}/revoke`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Share link revoked");

    loadNote();
  }

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  if (!note) {
    return (
      <div className="p-10 text-center">
        Note not found
      </div>
    );
  }

  const share = note.shareLinks?.[0];

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8">

      <div className="border rounded-xl p-6">

        <h1 className="text-3xl font-bold">
          {note.title}
        </h1>

        <div className="mt-5 whitespace-pre-wrap">
          {note.content}
        </div>

      </div>

      <ShareForm
        noteId={note.id}
        onSuccess={loadNote}
      />

      {share && !share.revoked && (
        <div className="border rounded-xl p-6 space-y-3">

          <h2 className="text-xl font-semibold">
            Active Share Link
          </h2>

          <input
            readOnly
            value={`${window.location.origin}/share/${share.token}`}
            className="border rounded w-full p-3"
          />

          <div>
            <strong>Share Type:</strong>{" "}
            {share.shareType}
          </div>

          <div>
            <strong>Access Type:</strong>{" "}
            {share.accessType}
          </div>

          <div>
            <strong>Views:</strong>{" "}
            {share.viewCount}
          </div>

          {share.expiresAt && (
            <div>
              <strong>Expires:</strong>{" "}
              {new Date(
                share.expiresAt
              ).toLocaleString()}
            </div>
          )}

          <button
            onClick={() => revoke(share.token)}
            className="bg-red-600 text-white px-5 py-2 rounded"
          >
            Revoke Link
          </button>

        </div>
      )}

    </div>
  );
}