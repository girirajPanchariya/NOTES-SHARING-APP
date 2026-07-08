"use client";

import { useState } from "react";

interface ShareFormProps {
  noteId: string;
  onSuccess?: (data: any) => void;
}

export default function ShareForm({
  noteId,
  onSuccess,
}: ShareFormProps) {
  const [loading, setLoading] = useState(false);

  const [shareType, setShareType] = useState<
    "ONE_TIME" | "TIME"
  >("ONE_TIME");

  const [accessType, setAccessType] = useState<
    "PUBLIC" | "PASSWORD"
  >("PUBLIC");

  const [expiresAt, setExpiresAt] = useState("");

  const [shareLink, setShareLink] = useState("");

  const [password, setPassword] = useState("");

  async function generateLink() {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/share/create", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          noteId,
          shareType,
          accessType,
          expiresAt:
            shareType === "TIME"
              ? expiresAt
              : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setShareLink(
        `${window.location.origin}${data.shareLink}`
      );

      if (data.password) {
        setPassword(data.password);
      }

      onSuccess?.(data);
    } catch {
      alert("Unable to generate link");
    }

    setLoading(false);
  }

  const copy = async () => {
    await navigator.clipboard.writeText(shareLink);
    alert("Copied");
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-5">

      <h2 className="text-xl font-bold">
        Share Settings
      </h2>

      <div>

        <label className="font-medium">
          Share Type
        </label>

        <select
          className="border w-full rounded p-3 mt-2"
          value={shareType}
          onChange={(e) =>
            setShareType(
              e.target.value as
                | "ONE_TIME"
                | "TIME"
            )
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

      <div>

        <label className="font-medium">
          Access Type
        </label>

        <select
          className="border w-full rounded p-3 mt-2"
          value={accessType}
          onChange={(e) =>
            setAccessType(
              e.target.value as
                | "PUBLIC"
                | "PASSWORD"
            )
          }
        >
          <option value="PUBLIC">
            Public
          </option>

          <option value="PASSWORD">
            Password Protected
          </option>

        </select>

      </div>

      {shareType === "TIME" && (

        <input
          type="datetime-local"
          className="border w-full rounded p-3"
          value={expiresAt}
          onChange={(e) =>
            setExpiresAt(e.target.value)
          }
        />

      )}

      <button
        onClick={generateLink}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg"
      >
        {loading
          ? "Generating..."
          : "Generate Share Link"}
      </button>

      {shareLink && (

        <div className="space-y-3">

          <input
            readOnly
            value={shareLink}
            className="border rounded p-3 w-full"
          />

          <button
            onClick={copy}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Copy Link
          </button>

          {password && (

            <div className="bg-yellow-100 p-4 rounded">

              <p className="font-semibold">
                Access Password
              </p>

              <p className="text-xl tracking-widest mt-2">
                {password}
              </p>

            </div>

          )}

        </div>

      )}

    </div>
  );
}