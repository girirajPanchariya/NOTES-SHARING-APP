"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isLoggedIn =
    typeof window !== "undefined" &&
    localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const linkClass = (path: string) =>
    pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          NoteShare
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          {isLoggedIn ? (
            <>
              <Link
                href="/notes/new"
                className={linkClass("/notes/new")}
              >
                New Note
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={linkClass("/login")}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}