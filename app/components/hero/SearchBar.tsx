"use client";

import { MapPin, CalendarDays, Users, Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-xl md:flex-row">

      {/* Destination */}
      <div className="flex flex-1 items-center gap-3 px-6 py-5">
        <MapPin className="text-blue-600" size={22} />

        <div className="flex w-full flex-col">
          <span className="text-xs font-semibold uppercase text-gray-500">
            Destination
          </span>

          <input
            type="text"
            placeholder="Where are you going?"
            className="bg-transparent text-gray-800 outline-none"
          />
        </div>
      </div>

      <div className="hidden w-px bg-gray-200 md:block"></div>

      {/* Date */}
      <div className="flex flex-1 items-center gap-3 px-6 py-5">
        <CalendarDays className="text-blue-600" size={22} />

        <div className="flex w-full flex-col">
          <span className="text-xs font-semibold uppercase text-gray-500">
            Travel Date
          </span>

          <input
            type="date"
            className="bg-transparent text-gray-800 outline-none"
          />
        </div>
      </div>

      <div className="hidden w-px bg-gray-200 md:block"></div>

      {/* Travelers */}
      <div className="flex flex-1 items-center gap-3 px-6 py-5">
        <Users className="text-blue-600" size={22} />

        <div className="flex w-full flex-col">
          <span className="text-xs font-semibold uppercase text-gray-500">
            Travelers
          </span>

          <select className="bg-transparent text-gray-800 outline-none">
            <option>1 Person</option>
            <option>2 People</option>
            <option>3 People</option>
            <option>4+ People</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-5 font-semibold text-white transition duration-300 hover:scale-105 hover:from-blue-700 hover:to-cyan-600">
        <Search size={20} />
        Search
      </button>
    </div>
  );
}