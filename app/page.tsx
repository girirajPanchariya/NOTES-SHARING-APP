import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6">

      <div className="max-w-3xl text-center">

        {/* Logo */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-white text-4xl shadow-lg">
          📝
        </div>

        {/* Heading */}
        <h1 className="text-6xl font-extrabold tracking-tight text-gray-900">
          Secure Notes
        </h1>

        <p className="mt-6 text-xl text-gray-600">
          Create, manage and share your notes securely with
          <span className="font-semibold text-blue-600">
            {" "}password protection and expiry links.
          </span>
        </p>


        {/* Buttons */}
        <div className="mt-10 flex justify-center gap-4">

          <Link
            href="/notes"
            className="rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold shadow-lg transition hover:bg-blue-700 hover:scale-105"
          >
            Go To Dashboard →
          </Link>


          <Link
            href="/login"
            className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 shadow transition hover:bg-gray-100"
          >
            Login
          </Link>

        </div>


        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-lg font-bold">
              🔒 Secure
            </h3>
            <p className="mt-2 text-gray-500 text-sm">
              Your notes are protected with secure authentication.
            </p>
          </div>


          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-lg font-bold">
              🔗 Share
            </h3>
            <p className="mt-2 text-gray-500 text-sm">
              Generate private share links for your notes.
            </p>
          </div>


          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-lg font-bold">
              ⏳ Expiry
            </h3>
            <p className="mt-2 text-gray-500 text-sm">
              Set time based or one-time access control.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}