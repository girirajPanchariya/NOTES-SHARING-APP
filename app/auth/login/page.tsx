"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid login details");
        return;
      }

      router.replace("/notes");

    } catch (err) {
      setError("Server error. Please try again.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-5">

      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Login
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Sign in to your Note Sharing account
        </p>


        {error && (
          <p className="mt-4 text-center text-red-500">
            {error}
          </p>
        )}


        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="mt-8 space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg text-black border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>


          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg text-black border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>


          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>


        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </main>
  );
}