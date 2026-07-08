"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function NoteDetails() {

  const { id } = useParams();

  const [note, setNote] = useState<any>(null);

  const [share, setShare] = useState<any>(null);

  useEffect(() => {
    loadNote();
  }, []);

  async function loadNote() {

    const token = localStorage.getItem("token");

    const res = await fetch(`/api/notes/${id}`, {

      headers: {

        Authorization: `Bearer ${token}`

      }

    });

    const data = await res.json();

    setNote(data);

  }

  async function generateShare() {

    const token = localStorage.getItem("token");

    const res = await fetch("/api/share/create", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`

      },

      body: JSON.stringify({

        noteId: id,

        shareType: note.shareType,

        accessType: note.accessType,

        expiresAt: note.expiry

      })

    });

    const data = await res.json();

    setShare(data);

  }

  async function revokeShare() {

    if (!share) return;

    const token = localStorage.getItem("token");

    await fetch(`/api/share/${share.share.token}/revoke`, {

      method: "PATCH",

      headers: {

        Authorization: `Bearer ${token}`

      }

    });

    alert("Share Link Revoked");

  }

  if (!note)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

  return (

    <div className="max-w-3xl mx-auto mt-10 space-y-6">

      <h1 className="text-3xl font-bold">
        {note.title}
      </h1>

      <div className="border rounded p-5 whitespace-pre-wrap">
        {note.content}
      </div>

      <button

        onClick={generateShare}

        className="bg-green-600 text-white px-5 py-2 rounded"

      >
        Generate Share Link
      </button>

      {share && (

        <div className="border rounded p-5 space-y-3">

          <div>

            <b>Share URL</b>

            <br />

            <input

              className="border p-2 w-full"

              readOnly

              value={`${window.location.origin}${share.shareLink}`}

            />

          </div>

          {share.password && (

            <div>

              <b>Password</b>

              <input

                className="border p-2 w-full"

                value={share.password}

                readOnly

              />

            </div>

          )}

          <button

            onClick={revokeShare}

            className="bg-red-600 text-white px-4 py-2 rounded"

          >
            Revoke Link
          </button>

        </div>

      )}

    </div>

  );

}