import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Calendar,
  Clock,
  Wallet,
  Mountain,
  Plane,
  ArrowRight,
} from "lucide-react";

type Destination = {
  _id: string;
  name: string;
  location: string;
  image?: string;
  rating: number;
  description?: string;
  bestTimeToVisit?: string;
  duration?: string;
  estimatedBudget?: string;
  attractions?: string[];
  activities?: string[];
  travelTips?: string[];
};

async function getDestination(id: string) {
  const response = await fetch(
    `http://localhost:3000/api/destinations/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) return null;

  const data = await response.json();
  return data.destination as Destination;
}

export default async function DestinationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const destination = await getDestination(id);

  if (!destination) notFound();

  return (
    <main className="bg-slate-950 text-white">
      {/* ================= HERO ================= */}

      <section className="relative h-[650px]">
        <Image
          src={destination.image || "/images/hero-bg.jpg"}
          alt={destination.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-slate-950" />

        <div className="absolute bottom-16 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur-md">
            <MapPin size={18} />
            {destination.location}
          </div>

          <h1 className="mt-6 text-6xl font-black">
            {destination.name}
          </h1>

          <div className="mt-5 flex items-center gap-2 text-yellow-400">
            <Star fill="currentColor" size={22} />
            <span className="text-xl font-bold">
              {destination.rating}
            </span>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="relative overflow-hidden py-24">
        {/* Background Blur */}
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* About */}

          <div className="mb-20">
            <h2 className="mb-6 text-4xl font-bold">
              About {destination.name}
            </h2>

            <p className="max-w-4xl text-lg leading-9 text-gray-300">
              {destination.description ||
                `Discover the beauty of ${destination.name}, located in ${destination.location}.`}
            </p>
          </div>

          {/* Information Cards */}

          <div className="mb-24 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
              <Calendar className="mb-5 text-blue-400" size={35} />

              <h3 className="text-2xl font-bold">
                Best Time
              </h3>

              <p className="mt-3 text-gray-400">
                {destination.bestTimeToVisit ||
                  "Coming Soon"}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
              <Clock className="mb-5 text-green-400" size={35} />

              <h3 className="text-2xl font-bold">
                Duration
              </h3>

              <p className="mt-3 text-gray-400">
                {destination.duration ||
                  "Coming Soon"}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
              <Wallet className="mb-5 text-yellow-400" size={35} />

              <h3 className="text-2xl font-bold">
                Budget
              </h3>

              <p className="mt-3 text-gray-400">
                {destination.estimatedBudget ||
                  "Coming Soon"}
              </p>
            </div>
          </div>

          {/* Attractions */}

          {destination.attractions &&
            destination.attractions.length > 0 && (
              <div className="mb-24">
                <h2 className="mb-10 text-4xl font-bold">
                  Top Attractions
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {destination.attractions.map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition hover:scale-105"
                      >
                        <MapPin className="mb-4 text-red-400" />
                        <p>{item}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Activities */}

          {destination.activities &&
            destination.activities.length > 0 && (
              <div className="mb-24">
                <h2 className="mb-10 text-4xl font-bold">
                  Things To Do
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {destination.activities.map(
                    (activity) => (
                      <div
                        key={activity}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition hover:scale-105"
                      >
                        <Mountain className="mb-4 text-blue-400" />
                        <p>{activity}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Travel Tips */}

          {destination.travelTips &&
            destination.travelTips.length > 0 && (
              <div className="mb-24 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-10 backdrop-blur-xl">
                <h2 className="mb-8 flex items-center gap-3 text-4xl font-bold">
                  <Plane />
                  Travel Tips
                </h2>

                <div className="space-y-5">
                  {destination.travelTips.map((tip) => (
                    <div
                      key={tip}
                      className="flex gap-3"
                    >
                      <span className="text-green-400">
                        ✔
                      </span>

                      <p className="text-gray-300">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* CTA */}

          <div className="rounded-[40px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-14 text-center shadow-2xl">
            <h2 className="text-5xl font-bold">
              Ready to explore {destination.name}?
            </h2>

            <p className="mt-5 text-lg text-blue-100">
              Let AI create your perfect itinerary in
              seconds.
            </p>

            <Link
              href={`/plan-trip?destination=${encodeURIComponent(
                destination.name
              )}`}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-blue-700 transition hover:scale-105"
            >
              Plan Your Trip
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}