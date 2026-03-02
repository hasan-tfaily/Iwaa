import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">IWAA</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Save and browse places with images, locations, and addresses.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/places"
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Places
          </Link>
          <Link
            href="/admin"
            className="px-6 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
}
