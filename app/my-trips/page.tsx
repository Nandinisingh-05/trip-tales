"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

        setTrips(data.trips);
      } catch (error) {
        console.error("Fetch trips error:", error);
        setError("Could not load your trips.");
      } finally {
        setLoading(false);
      }
    }

    getTrips();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-20 text-center">
        <p className="text-lg text-gray-600">
          Loading your trips...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-20 text-center">
        <p className="text-red-600">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-black">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="font-semibold text-blue-600">
            Your Adventures
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            My Trips
          </h1>

          <p className="mt-3 text-gray-600">
            View and manage all your planned journeys.
          </p>
        </div>

        {/* No Trips */}
        {trips.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">
              ✈️
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              No trips planned yet
            </h2>

            <p className="mt-2 text-gray-600">
              Start planning your first adventure.
            </p>

            <a
              href="/plan-trip"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Plan a Trip
            </a>
          </div>
        ) : (
          /* Trip Cards */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-600">
                      {trip.tripType}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      {trip.destination}
                    </h2>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {trip.status}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-3 text-gray-600">
                  <p>
                    📅{" "}
                    {new Date(
                      trip.startDate
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      trip.endDate
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    👥 {trip.travelers} Traveler
                    {trip.travelers > 1 ? "s" : ""}
                  </p>

                  <p>
                    💰 Budget: ₹
                    {trip.budget.toLocaleString("en-IN")}
                  </p>

                  <p>
                    🎒 {trip.tripType} Trip
                  </p>
                </div>

                <Link
                    href={`/my-trips/${trip._id}`}
                  className="mt-6 block w-full rounded-xl border border-blue-600 px-4 py-2 text-center font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                    View Trip
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}