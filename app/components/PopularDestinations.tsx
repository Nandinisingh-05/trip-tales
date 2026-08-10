"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Heart,
  ArrowRight,
  Calendar,
  Wallet,
} from "lucide-react";

type Destination = {
  _id: string;
  name: string;
  location: string;
  rating: number;
  image?: string;
  duration?: string;
  estimatedBudget?: string;
  bestTimeToVisit?: string;
};

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getDestinations() {
      try {
        const response = await fetch("/api/destinations");

        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }

        const data = await response.json();

        setDestinations(data.destinations);
      } catch (err) {
        console.error(err);
        setError("Could not load destinations.");
      } finally {
        setLoading(false);
      }
    }

    getDestinations();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#050816] py-24 text-center text-white">
        Loading destinations...
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#050816] py-24 text-center text-red-400">
        {error}
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#050816] via-[#071126] to-[#020617] py-24">

      {/* Background Glow */}
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[150px]" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-16 text-center">

          <span className="rounded-full bg-blue-600/20 px-5 py-2 text-sm font-semibold text-blue-300">
            Explore India
          </span>

          <h2 className="mt-5 text-5xl font-extrabold text-white">
            Discover
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Beautiful Places
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Handpicked destinations for your next unforgettable adventure.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {destinations.map((destination, index) => (

            <motion.div
              key={destination._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
            >
              <Link href={`/destinations/${destination._id}`}>

                <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-4 hover:border-blue-500 hover:shadow-[0_25px_60px_rgba(59,130,246,0.3)]">

                  {/* Image */}

                  <div className="relative h-72 overflow-hidden">

                    <Image
                      src={destination.image || "/images/hero-bg.jpg"}
                      alt={destination.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                      Popular
                    </div>

                    <button className="absolute right-4 top-4 rounded-full bg-white/80 p-2 transition hover:scale-110 hover:bg-red-500 hover:text-white">
                      <Heart size={18} />
                    </button>

                  </div>

                  {/* Content */}

                  <div className="p-6">

                    <div className="mb-4 flex items-center justify-between">

                      <h3 className="text-2xl font-bold text-white">
                        {destination.name}
                      </h3>

                      <div className="flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black">
                        <Star size={15} fill="currentColor" />
                        {destination.rating}
                      </div>

                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={16} />
                      {destination.location}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">

                      <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300">
                        <Calendar size={14} />
                        {destination.duration || "4-5 Days"}
                      </span>

                      <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300">
                        ☀ {destination.bestTimeToVisit || "Oct - Jun"}
                      </span>

                    </div>

                    <div className="mt-6 flex items-center justify-between">

                      <div>

                        <p className="text-xs uppercase tracking-wider text-gray-500">
                          Starting From
                        </p>

                        <div className="mt-1 flex items-center gap-2">

                          <Wallet
                            size={18}
                            className="text-blue-400"
                          />

                          <p className="text-xl font-bold text-blue-400">
                            {destination.estimatedBudget || "₹15,000"}
                          </p>

                        </div>

                      </div>

                      <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-semibold text-white transition hover:scale-105 hover:from-blue-700 hover:to-cyan-600">
                        Explore
                        <ArrowRight
                          size={18}
                          className="transition group-hover:translate-x-1"
                        />
                      </button>

                    </div>

                  </div>

                </div>

              </Link>
            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}