"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type Destination = {
  _id: string;
  name: string;
  location: string;
  rating: number;
  image?: string;
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
      } catch (error) {
        console.error(error);

        setError("Could not load destinations.");
      } finally {
        setLoading(false);
      }
    }

    getDestinations();
  }, []);

  if (loading) {
    return (
      <section className="px-6 py-20 text-center">
        <p>Loading destinations...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-6 py-20 text-center">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="bg-white px-6 py-20 text-black">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="font-semibold text-blue-600">
            Explore India
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Popular Destinations
          </h2>

          <p className="mt-3 text-gray-600">
            Discover some of the most loved destinations for your next trip.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
  {destinations.map((destination) => (
    <Link
      href={`/destinations/${destination._id}`}
      key={destination._id}
      className="block"
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">

        <Image
          src={destination.image || "/images/hero.jpg"}
          alt={destination.name}
          width={800}
          height={500}
          className="h-64 w-full object-cover"
        />

        <div className="p-5">
          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-xl font-bold">
                {destination.name}
              </h3>

              <p className="text-gray-500">
                {destination.location}
              </p>
            </div>

            <span className="font-semibold">
              ⭐ {destination.rating}
            </span>

          </div>
        </div>

      </div>
    </Link>
  ))}
</div>
</div>
    </section>
  );
}