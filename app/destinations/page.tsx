"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Star, ArrowRight } from "lucide-react";

type Destination = {
  _id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  description: string;
};

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await fetch("/api/destinations");

        if (!res.ok) {
          throw new Error("Failed to fetch destinations");
        }

        const data = await res.json();
        setDestinations(data.destinations || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black">
        <h1 className="text-3xl font-bold text-white animate-pulse">
          Loading Destinations...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black pt-32 pb-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h1 className="text-5xl font-extrabold">
            Explore Destinations
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            Discover amazing places across India
          </p>
        </div>

        {/* Search */}
        <div className="relative mx-auto mb-16 max-w-2xl">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />

          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-6 text-white backdrop-blur-xl outline-none transition focus:border-blue-500"
          />
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="text-3xl font-bold">
              No destinations found
            </h2>

            <p className="mt-3 text-gray-400">
              Try searching for another destination.
            </p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => (
              <Link
                key={destination._id}
                href={`/destinations/${destination._id}`}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-white">
                    {destination.name}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-gray-300">
                    <MapPin size={18} className="text-pink-400" />
                    <span>{destination.location}</span>
                  </div>

                  <p className="mt-5 line-clamp-3 leading-7 text-gray-400">
                    {destination.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Star
                        fill="currentColor"
                        size={18}
                      />
                      <span className="font-semibold">
                        {destination.rating}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-semibold text-blue-400 transition group-hover:gap-3">
                      View Details
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}