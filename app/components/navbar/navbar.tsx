"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[90%] max-w-7xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-full border border-white/20 bg-white/10 px-10 py-4 backdrop-blur-xl shadow-2xl">

        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wide text-white"
        >
          <span className="text-blue-400">Trip</span> Tales
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">

          <Link
            href="/"
            className="font-medium text-white transition hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            href="/destinations"
            className="font-medium text-white transition hover:text-blue-400"
          >
            Destinations
          </Link>

          <Link
            href="/my-trips"
            className="font-medium text-white transition hover:text-blue-400"
          >
            My Trips
          </Link>

          <Link
            href="/stories"
            className="font-medium text-white transition hover:text-blue-400"
          >
            Stories
          </Link>

          <Link
            href="/login"
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 hover:scale-105"
          >
            Login
          </Link>

        </div>
      </div>
    </nav>
  );
}