import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-5xl font-bold">
          Secure Notes
        </h1>

        <p className="mt-4 text-gray-500">
          Create and Share Notes Securely
        </p>

        <Link
          href="/notes"
          className="bg-blue-600 text-white px-6 py-3 rounded mt-8 inline-block"
        >
          Go To Dashboard
        </Link>

      </div>

    </div>
  );
}