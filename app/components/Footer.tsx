"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h2 className="text-xl font-bold text-blue-600">
            NoteShare
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Secure Note Sharing Application
          </p>
        </div>

        <div className="flex gap-5 mt-4 md:mt-0">

          <Link
            href="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/notes/new"
            className="hover:text-blue-600"
          >
            New Note
          </Link>

          <Link
            href="/login"
            className="hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="hover:text-blue-600"
          >
            Register
          </Link>

        </div>

      </div>

      <div className="border-t py-3 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NoteShare. All Rights Reserved.
      </div>
    </footer>
  );
}