"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PlanTripPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState("Solo");
  const [budget, setBudget] = useState("Medium");
  const [tripType, setTripType] = useState("Adventure");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          travelers,
          budget,
          tripType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      router.push("/my-trips");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-black shadow-xl">

        <h1 className="mb-8 text-center text-4xl font-bold">
          ✈️ Plan Your Trip
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="mb-2 block font-semibold">
              Destination
            </label>

            <input
              type="text"
              value={destination}
              onChange={(e) =>
                setDestination(e.target.value)
              }
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-2 block font-semibold">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Travelers
            </label>

            <select
              value={travelers}
              onChange={(e) =>
                setTravelers(e.target.value)
              }
              className="w-full rounded-lg border p-3"
            >
              <option>Solo</option>
              <option>Couple</option>
              <option>Family</option>
              <option>Friends</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Budget
            </label>

            <select
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
              className="w-full rounded-lg border p-3"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>Luxury</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Trip Type
            </label>

            <select
              value={tripType}
              onChange={(e) =>
                setTripType(e.target.value)
              }
              className="w-full rounded-lg border p-3"
            >
              <option>Adventure</option>
              <option>Nature</option>
              <option>Beach</option>
              <option>Road Trip</option>
              <option>Honeymoon</option>
              <option>Religious</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-4 text-lg font-bold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Generating AI Trip..."
              : "Generate AI Trip"}
          </button>

        </form>
      </div>
    </main>
  );
}