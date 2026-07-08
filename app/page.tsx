import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">

        <h1 className="text-5xl font-bold text-blue-600">
          Secure Note Sharing App
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Create notes and share them securely using
          public links or password-protected links.
          Support for one-time access, time-based expiry,
          revoke links, and view tracking.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg"
          >
            Login
          </Link>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              📝 Create Notes
            </h3>

            <p className="text-gray-600">
              Create notes with title and content in seconds.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              🔒 Secure Sharing
            </h3>

            <p className="text-gray-600">
              Share notes publicly or protect them using
              dynamically generated passwords.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              ⏳ Expiry Support
            </h3>

            <p className="text-gray-600">
              One-time access and time-based expiry supported.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              👁 View Tracking
            </h3>

            <p className="text-gray-600">
              Track successful note views with accurate view count.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              🚫 Revoke Links
            </h3>

            <p className="text-gray-600">
              Revoke any shared link instantly.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">
              ⚡ Fast & Secure
            </h3>

            <p className="text-gray-600">
              Built using Next.js, Prisma, PostgreSQL and JWT.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 border-t mt-10">
        © {new Date().getFullYear()} NoteShare App
      </footer>

    </main>
  );
}