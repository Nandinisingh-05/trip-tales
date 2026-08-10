import {
  Calendar,
  Wallet,
  Users,
  Plane,
  MapPin,
  CheckCircle,
} from "lucide-react";

type ItineraryDay = {
  day: number;
  title: string;
  activities: string[];
};

type Trip = {
  _id: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  tripType: string;
  status: string;
  itinerary: ItineraryDay[];
};

async function getTrip(id: string) {
  const response = await fetch(
    `http://localhost:3000/api/trips/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.trip as Trip;
}

export default async function TripDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const trip = await getTrip(id);

  if (!trip) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black">
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-10 backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-red-400">
            Trip not found
          </h1>

          <p className="mt-4 text-gray-300">
            We could not find this trip.
          </p>
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
            {trip.tripType} Trip
          </p>

          <h1 className="mt-4 text-5xl font-extrabold">
            {trip.destination}
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            Complete Trip Details
          </p>
        </div>

        {/* Trip Information */}

        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Calendar className="mb-4 text-blue-400" />
            <h3 className="font-bold text-xl">
              Start Date
            </h3>

            <p className="mt-3 text-gray-300">
              {new Date(trip.startDate).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Calendar className="mb-4 text-pink-400" />
            <h3 className="font-bold text-xl">
              End Date
            </h3>

            <p className="mt-3 text-gray-300">
              {new Date(trip.endDate).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Users className="mb-4 text-cyan-400" />
            <h3 className="font-bold text-xl">
              Travelers
            </h3>

            <p className="mt-3 text-gray-300">
              {trip.travelers}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Wallet className="mb-4 text-yellow-400" />
            <h3 className="font-bold text-xl">
              Budget
            </h3>

            <p className="mt-3 text-gray-300">
              ₹{trip.budget.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <Plane className="mb-4 text-green-400" />
            <h3 className="font-bold text-xl">
              Trip Type
            </h3>

            <p className="mt-3 text-gray-300">
              {trip.tripType}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <CheckCircle className="mb-4 text-emerald-400" />
            <h3 className="font-bold text-xl">
              Status
            </h3>

            <span className="mt-3 inline-block rounded-full bg-green-500/20 px-4 py-2 text-green-400">
              {trip.status}
            </span>
          </div>

        </div>

        {/* Itinerary */}

        <div className="mb-10">

          <p className="font-semibold uppercase tracking-widest text-blue-400">
            Your Journey
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Trip Itinerary
          </h2>

          <p className="mt-3 text-gray-400">
            Day-by-day itinerary for your trip.
          </p>

        </div>

        {trip.itinerary?.length ? (

          <div className="space-y-8">

            {trip.itinerary.map((day) => (

              <div
                key={day.day}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >

                <div className="flex gap-6">

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold">
                    {day.day}
                  </div>

                  <div className="flex-1">

                    <p className="font-semibold text-blue-400">
                      Day {day.day}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {day.title}
                    </h3>

                    <div className="mt-6 space-y-4">

                      {day.activities.map((activity, index) => (

                        <div
                          key={index}
                          className="flex items-start gap-3"
                        >

                          <MapPin
                            size={18}
                            className="mt-1 text-pink-400"
                          />

                          <p className="text-gray-300">
                            {activity}
                          </p>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">

            <Plane
              size={60}
              className="mx-auto text-blue-400"
            />

            <h3 className="mt-6 text-3xl font-bold">
              No Itinerary Yet
            </h3>

            <p className="mt-3 text-gray-400">
              An itinerary has not been created for this trip.
            </p>

          </div>

        )}

      </div>
    </main>
  );
}