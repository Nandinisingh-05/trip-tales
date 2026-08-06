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
      <main className="min-h-screen bg-gray-50 px-6 py-20 text-center text-black">
        <h1 className="text-3xl font-bold">
          Trip not found
        </h1>

        <p className="mt-3 text-gray-600">
          We could not find this trip.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-black">
      <div className="mx-auto max-w-4xl">

        {/* Trip Heading */}
        <p className="font-semibold text-blue-600">
          {trip.tripType} Trip
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          {trip.destination}
        </h1>

        <p className="mt-2 text-gray-600">
          Trip Details
        </p>

        {/* Trip Information Card */}
        <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">
          <div className="grid gap-6 md:grid-cols-2">

            {/* Start Date */}
            <div>
              <p className="text-sm text-gray-500">
                Start Date
              </p>

              <p className="mt-1 font-semibold">
                {new Date(
                  trip.startDate
                ).toLocaleDateString()}
              </p>
            </div>

            {/* End Date */}
            <div>
              <p className="text-sm text-gray-500">
                End Date
              </p>

              <p className="mt-1 font-semibold">
                {new Date(
                  trip.endDate
                ).toLocaleDateString()}
              </p>
            </div>

            {/* Travelers */}
            <div>
              <p className="text-sm text-gray-500">
                Travelers
              </p>

              <p className="mt-1 font-semibold">
                👥 {trip.travelers}
              </p>
            </div>

            {/* Budget */}
            <div>
              <p className="text-sm text-gray-500">
                Budget
              </p>

              <p className="mt-1 font-semibold">
                ₹{trip.budget.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Trip Type */}
            <div>
              <p className="text-sm text-gray-500">
                Trip Type
              </p>

              <p className="mt-1 font-semibold">
                🎒 {trip.tripType}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <p className="mt-1 font-semibold">
                {trip.status}
              </p>
            </div>

          </div>
        </div>

        {/* ITINERARY SECTION */}
        <section className="mt-12">

          <div className="mb-6">
            <p className="font-semibold text-blue-600">
              Your Journey
            </p>

            <h2 className="mt-1 text-3xl font-bold">
              Trip Itinerary
            </h2>

            <p className="mt-2 text-gray-600">
              Your day-by-day plan for {trip.destination}.
            </p>
          </div>

          {/* Check if itinerary exists */}
          {trip.itinerary && trip.itinerary.length > 0 ? (

            <div className="space-y-6">

              {trip.itinerary.map((item) => (

                <div
                  key={item.day}
                  className="rounded-2xl bg-white p-6 shadow-md"
                >

                  <div className="flex gap-5">

                    {/* Day Circle */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      {item.day}
                    </div>

                    {/* Day Information */}
                    <div>

                      <p className="text-sm font-semibold text-blue-600">
                        Day {item.day}
                      </p>

                      <h3 className="mt-1 text-xl font-bold">
                        {item.title}
                      </h3>

                      {/* Activities */}
                      <div className="mt-4 space-y-2">

                        {item.activities.map(
                          (activity, index) => (

                            <p
                              key={index}
                              className="text-gray-600"
                            >
                              📍 {activity}
                            </p>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            /* No itinerary */
            <div className="rounded-2xl bg-white p-8 text-center shadow-md">

              <p className="text-gray-600">
                No itinerary has been added yet.
              </p>

            </div>

          )}

        </section>

      </div>
    </main>
  );
}