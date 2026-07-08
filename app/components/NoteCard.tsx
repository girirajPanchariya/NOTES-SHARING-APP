"use client";

import Link from "next/link";
import { useState } from "react";

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

interface Props {
  note: Note;
  onDelete?: (id: string) => void;
}

export default function NoteCard({
  note,
  onDelete,
}: Props) {
  const [copied, setCopied] = useState(false);

  const share = note.shareLinks?.[0];

  const copyLink = async () => {
    if (!share) return;

    const url =
      `${window.location.origin}/share/${share.token}`;

    await navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border rounded-xl shadow-sm bg-white p-6 space-y-4">

      <div className="flex justify-between">

        <h2 className="text-2xl font-semibold">
          {note.title}
        </h2>

        <Link
          href={`/notes/${note.id}`}
          className="text-blue-600 hover:underline"
        >
          Open
        </Link>

      </div>

      <p className="text-gray-700 whitespace-pre-wrap">
        {note.content.length > 180
          ? note.content.substring(0, 180) + "..."
          : note.content}
      </p>

      <div className="text-sm text-gray-500">
        Created :
        {" "}
        {new Date(
          note.createdAt
        ).toLocaleString()}
      </div>

      {share && (

        <div className="border rounded-lg p-4 bg-gray-50 space-y-2">

          <div className="flex gap-2 flex-wrap">

            <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
              {share.accessType}
            </span>

            <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
              {share.shareType}
            </span>

            {share.revoked && (
              <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs">
                Revoked
              </span>
            )}

          </div>

          <p className="text-sm">
            Views :
            {" "}
            <strong>{share.viewCount}</strong>
          </p>

          <button
            onClick={copyLink}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {copied
              ? "Copied!"
              : "Copy Share Link"}
          </button>

        </div>

      )}

      <div className="flex gap-3">

        <Link
          href={`/notes/${note.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View
        </Link>

        {onDelete && (

          <button
            onClick={() => onDelete(note.id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>

        )}

      </div>

    </div>
  );
}