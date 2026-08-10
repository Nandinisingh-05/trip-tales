"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Wallet,
  Plane,
  ArrowRight,
  MapPin,
} from "lucide-react";

type Trip = {
  _id: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  tripType: string;
  status: string;
};

export default function MyTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTrips() {
      try {
        const response = await fetch("/api/trips");

        if (!response.ok) {
          throw new Error("Failed to fetch trips");
        }

        const data = await response.json();
        setTrips(data.trips || []);
      } catch (error) {
        console.error(error);
        setError("Could not load your trips.");
      } finally {
        setLoading(false);
      }
    }

    getTrips();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black">
        <h1 className="animate-pulse text-3xl font-bold text-white">
          Loading your trips...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black">
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 px-10 py-8 text-center backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-red-400">
            {error}
          </h2>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black pt-32 pb-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mb-16 text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-400">
            Your Adventures
          </p>

          <h1 className="mt-4 text-5xl font-extrabold">
            My Trips
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            View and manage all your planned journeys.
          </p>
        </div>

        {/* Empty State */}

        {trips.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-16 text-center backdrop-blur-xl">
            <Plane
              size={70}
              className="mx-auto text-blue-400"
            />

            <h2 className="mt-8 text-3xl font-bold">
              No Trips Planned
            </h2>

            <p className="mt-4 text-gray-400">
              Your next unforgettable journey starts here.
            </p>

            <Link
              href="/plan-trip"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
            >
              Plan Your First Trip
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)]"
              >
                {/* Header */}

                <div className="flex items-start justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-blue-400">
                      <MapPin size={18} />
                      <span className="text-sm font-semibold uppercase">
                        {trip.tripType}
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold">
                      {trip.destination}
                    </h2>
                  </div>

                  <span className="rounded-full bg-green-500/20 px-4 py-1 text-sm font-semibold text-green-400">
                    {trip.status}
                  </span>
                </div>

                {/* Details */}

                <div className="mt-8 space-y-5 text-gray-300">
                  <div className="flex items-center gap-3">
                    <Calendar
                      size={18}
                      className="text-blue-400"
                    />

                    <span>
                      {new Date(
                        trip.startDate
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(
                        trip.endDate
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users
                      size={18}
                      className="text-pink-400"
                    />

                    <span>
                      {trip.travelers} Traveler
                      {trip.travelers > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Wallet
                      size={18}
                      className="text-yellow-400"
                    />

                    <span>
                      ₹
                      {trip.budget.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Plane
                      size={18}
                      className="text-cyan-400"
                    />

                    <span>{trip.tripType} Trip</span>
                  </div>
                </div>

                {/* Button */}

                <Link
                  href={`/my-trips/${trip._id}`}
                  className="mt-10 flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
                >
                  View Trip
                  <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}