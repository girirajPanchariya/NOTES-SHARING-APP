"use client";

import { useState } from "react";

interface NoteFormProps {
  initialData?: {
    title: string;
    content: string;
    shareType: "ONE_TIME" | "TIME";
    expiry?: string;
  };

  onSubmit: (data: any) => Promise<void>;

  loading?: boolean;
}

export default function NoteForm({
  initialData,
  onSubmit,
  loading = false,
}: NoteFormProps) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    shareType: initialData?.shareType || "ONE_TIME",
    accessType: "PUBLIC",
    expiry: initialData?.expiry || "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!form.content.trim()) {
      setError("Content is required");
      return;
    }

    if (
      form.shareType === "TIME" &&
      !form.expiry
    ) {
      setError("Please select an expiry date.");
      return;
    }

    await onSubmit({
      ...form,
      accessType: "PUBLIC",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold">
        Create Note
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="font-medium">
          Title
        </label>

        <input
          className="border w-full rounded p-3 mt-1"
          placeholder="Enter title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="font-medium">
          Content
        </label>

        <textarea
          rows={8}
          className="border w-full rounded p-3 mt-1"
          placeholder="Write your note..."
          value={form.content}
          onChange={(e) =>
            setForm({
              ...form,
              content: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="font-medium">
          Share Type
        </label>

        <select
          className="border w-full rounded p-3 mt-1"
          value={form.shareType}
          onChange={(e) =>
            setForm({
              ...form,
              shareType: e.target.value as
                | "ONE_TIME"
                | "TIME",
            })
          }
        >
          <option value="ONE_TIME">
            One Time
          </option>

          <option value="TIME">
            Time Based
          </option>
        </select>
      </div>

      {form.shareType === "TIME" && (
        <div>
          <label className="font-medium">
            Expiry Date
          </label>

          <input
            type="datetime-local"
            className="border w-full rounded p-3 mt-1"
            value={form.expiry}
            onChange={(e) =>
              setForm({
                ...form,
                expiry: e.target.value,
              })
            }
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
      >
        {loading ? "Saving..." : "Save Note"}
      </button>
    </form>
  );
}