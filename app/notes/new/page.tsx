"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    shareType: "ONE_TIME",
    accessType: "PUBLIC",
    expiry: "",
  });

  async function createNote(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/notes", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      router.push(`/notes/${data.id}`);
    } catch {
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-6">
        Create Note
      </h1>

      <form
        onSubmit={createNote}
        className="space-y-5"
      >
        <input
          className="w-full border rounded p-3"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <textarea
          rows={8}
          className="w-full border rounded p-3"
          placeholder="Content"
          value={form.content}
          onChange={(e) =>
            setForm({
              ...form,
              content: e.target.value,
            })
          }
        />

        <select
          className="w-full border rounded p-3"
          value={form.shareType}
          onChange={(e) =>
            setForm({
              ...form,
              shareType: e.target.value,
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

        <select
          className="w-full border rounded p-3"
          value={form.accessType}
          onChange={(e) =>
            setForm({
              ...form,
              accessType: e.target.value,
            })
          }
        >
          <option value="PUBLIC">
            Public
          </option>

          <option value="PASSWORD">
            Password Protected
          </option>
        </select>

        {form.shareType === "TIME" && (
          <input
            type="datetime-local"
            className="w-full border rounded p-3"
            value={form.expiry}
            onChange={(e) =>
              setForm({
                ...form,
                expiry: e.target.value,
              })
            }
          />
        )}

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
}