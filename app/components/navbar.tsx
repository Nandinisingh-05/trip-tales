import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-white text-black shadow-md">

      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        Trip Tales
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>

        <Link href="/destinations" className="hover:text-blue-600">
          Destinations
        </Link>

        <Link href="/my-trips" className="hover:text-blue-600">
          My Trips
        </Link>

        <Link href="/stories" className="hover:text-blue-600">
          Stories
        </Link>

        <Link
          href="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700"
        >
          Login
        </Link>
      </div>

    </nav>
  );
} 