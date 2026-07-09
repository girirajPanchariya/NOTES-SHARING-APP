"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }


    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });


      const data = await res.json();


      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }


      router.push("/auth/login");


    } catch (error) {

      setError("Something went wrong");

    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-5">

      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>


        <p className="mt-2 text-center text-gray-500">
          Register to start using Note Sharing App
        </p>


        {error && (
          <p className="mt-4 text-center text-red-500">
            {error}
          </p>
        )}


        <form 
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >


          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3 text-black outline-none focus:border-blue-500"
            />
          </div>



          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3 text-black outline-none focus:border-blue-500"
            />
          </div>



          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full rounded-lg border px-4 py-3 text-black outline-none focus:border-blue-500"
            />
          </div>



          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3 text-black outline-none focus:border-blue-500"
            />
          </div>



          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>


        </form>



        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}

          <Link
            href="/auth/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>


      </div>

    </main>
  );
}