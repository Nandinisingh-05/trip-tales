import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

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

  if (!response.ok) {
    return null;
  }

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

  if (!destination) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-black">

      {/* ================= HERO ================= */}

      <section className="relative h-[500px] w-full">
        <Image
          src={destination.image || "/images/hero.jpg"}
          alt={destination.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 text-white">

            <p className="mb-2 text-lg">
              📍 {destination.location}
            </p>

            <h1 className="text-5xl font-bold md:text-6xl">
              {destination.name}
            </h1>

            <p className="mt-4 text-xl">
              ⭐ {destination.rating}
            </p>

          </div>
        </div>
      </section>


      {/* ================= CONTENT ================= */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        {/* ABOUT */}

        <div className="mb-14">

          <h2 className="text-3xl font-bold">
            About {destination.name}
          </h2>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-gray-600">
            {destination.description ||
              `Discover the beauty of ${destination.name}, located in ${destination.location}.`}
          </p>

        </div>


        {/* ================= TRIP INFORMATION ================= */}

        <div className="mb-16 grid gap-6 md:grid-cols-3">

          {/* BEST TIME */}

          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">

            <div className="mb-3 text-3xl">
              📅
            </div>

            <h3 className="text-lg font-bold">
              Best Time to Visit
            </h3>

            <p className="mt-2 text-gray-600">
              {destination.bestTimeToVisit || "Information coming soon"}
            </p>

          </div>


          {/* DURATION */}

          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">

            <div className="mb-3 text-3xl">
              ⏱️
            </div>

            <h3 className="text-lg font-bold">
              Ideal Duration
            </h3>

            <p className="mt-2 text-gray-600">
              {destination.duration || "Information coming soon"}
            </p>

          </div>


          {/* BUDGET */}

          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">

            <div className="mb-3 text-3xl">
              💰
            </div>

            <h3 className="text-lg font-bold">
              Estimated Budget
            </h3>

            <p className="mt-2 text-gray-600">
              {destination.estimatedBudget || "Information coming soon"}
            </p>

          </div>

        </div>


        {/* ================= ATTRACTIONS ================= */}

        {destination.attractions &&
          destination.attractions.length > 0 && (

          <div className="mb-16">

            <h2 className="mb-6 text-3xl font-bold">
              Top Attractions
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {destination.attractions.map((attraction) => (

                <div
                  key={attraction}
                  className="rounded-xl bg-gray-50 p-5 shadow-sm"
                >

                  <span className="mr-2">
                    📍
                  </span>

                  <span className="font-semibold">
                    {attraction}
                  </span>

                </div>

              ))}

            </div>

          </div>

        )}


        {/* ================= ACTIVITIES ================= */}

        {destination.activities &&
          destination.activities.length > 0 && (

          <div className="mb-16">

            <h2 className="mb-6 text-3xl font-bold">
              Things To Do
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {destination.activities.map((activity) => (

                <div
                  key={activity}
                  className="rounded-xl border border-gray-200 p-5"
                >

                  <span className="mr-2">
                    🏔️
                  </span>

                  <span className="font-semibold">
                    {activity}
                  </span>

                </div>

              ))}

            </div>

          </div>

        )}


        {/* ================= TRAVEL TIPS ================= */}

        {destination.travelTips &&
          destination.travelTips.length > 0 && (

          <div className="mb-16 rounded-2xl bg-blue-50 p-8">

            <h2 className="mb-6 text-3xl font-bold">
              Travel Tips
            </h2>

            <div className="space-y-4">

              {destination.travelTips.map((tip) => (

                <div
                  key={tip}
                  className="flex items-start gap-3"
                >

                  <span className="text-blue-600">
                    ✓
                  </span>

                  <p className="text-gray-700">
                    {tip}
                  </p>

                </div>

              ))}

            </div>

          </div>

        )}


        {/* ================= PLAN TRIP ================= */}

        <div className="rounded-3xl bg-gray-900 p-10 text-center text-white">

          <h2 className="text-3xl font-bold">
            Ready to explore {destination.name}?
          </h2>

          <p className="mt-3 text-gray-300">
            Start planning your journey and create unforgettable memories.
          </p>

          <Link
             href={`/plan-trip?destination=${encodeURIComponent(destination.name)}`}
             className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
           Plan Your Trip
          </Link>

        </div>

      </section>

    </main>
  );
}