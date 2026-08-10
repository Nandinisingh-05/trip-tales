"use client";

import SearchBar from "./SearchBar";
import { MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Travel"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-[#050816]" />

      {/* Content */}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">

        <span className="rounded-full border border-white/30 bg-white/10 px-5 py-2 backdrop-blur-md">
          🌍 AI Powered Travel Planner
        </span>

        <h1 className="mt-8 max-w-5xl text-6xl font-black leading-tight md:text-8xl">
          Explore The
          <br />
          World Smarter
        </h1>

        <p className="mt-8 max-w-2xl text-xl text-gray-200">
          Plan unforgettable journeys with AI generated itineraries,
          discover hidden gems and travel like never before.
        </p>

        <div className="mt-12 w-full max-w-4xl">
          <SearchBar />
        </div>

        {/* Popular Tags */}

        <div className="mt-10 flex flex-wrap justify-center gap-3">

          {[
            "Manali",
            "Goa",
            "Kashmir",
            "Jaipur",
            "Kerala",
          ].map((city) => (
            <button
              key={city}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md transition hover:bg-blue-600"
            >
              <MapPin size={15} className="mr-2 inline" />
              {city}
            </button>
          ))}

        </div>

      </div>

    </section>
  );
}