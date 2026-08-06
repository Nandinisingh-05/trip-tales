"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PlanTripPage() {
  const searchParams = useSearchParams();
  const selectedDestination = searchParams.get("destination") || "";

  const [formData, setFormData] = useState({
    destination: selectedDestination,
    startDate: "",
    endDate: "",
    travelers: 1,
    budget: "",
    tripType: "Adventure",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");

      const response = await fetch("/api/trips", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          destination: formData.destination,
          startDate: formData.startDate,
          endDate: formData.endDate,
          travelers: formData.travelers,
          budget: Number(formData.budget),
          tripType: formData.tripType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create trip"
        );
      }

      setMessage("Trip created successfully! 🎉");

      // Clear form after successful submission
      setFormData({
        destination: "",
        startDate: "",
        endDate: "",
        travelers: 1,
        budget: "",
        tripType: "Adventure",
      });
    } catch (error) {
      console.error("Create trip error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16 text-black">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="font-semibold text-blue-600">
            Trip Planner
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Plan Your Next Adventure
          </h1>

          <p className="mt-3 text-gray-600">
            Tell us about your trip and start planning
            your journey.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-lg"
        >

          {/* Destination */}
          <div className="mb-6">
            <label className="mb-2 block font-semibold">
              Destination
            </label>

            <input
              type="text"
              value={formData.destination}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  destination: e.target.value,
                })
              }
              placeholder="e.g. Manali"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
              required
            />
          </div>

          {/* Dates */}
          <div className="mb-6 grid gap-6 md:grid-cols-2">

            {/* Start Date */}
            <div>
              <label className="mb-2 block font-semibold">
                Start Date
              </label>

              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startDate: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label className="mb-2 block font-semibold">
                End Date
              </label>

              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    endDate: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
                required
              />
            </div>

          </div>

          {/* Travelers + Budget */}
          <div className="mb-6 grid gap-6 md:grid-cols-2">

            {/* Travelers */}
            <div>
              <label className="mb-2 block font-semibold">
                Number of Travelers
              </label>

              <input
                type="number"
                min="1"
                value={formData.travelers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    travelers: Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label className="mb-2 block font-semibold">
                Budget (₹)
              </label>

              <input
                type="number"
                min="1"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budget: e.target.value,
                  })
                }
                placeholder="20000"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
                required
              />
            </div>

          </div>

          {/* Trip Type */}
          <div className="mb-8">
            <label className="mb-2 block font-semibold">
              Trip Type
            </label>

            <select
              value={formData.tripType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tripType: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
            >
              <option value="Adventure">
                Adventure
              </option>

              <option value="Relaxation">
                Relaxation
              </option>

              <option value="Family">
                Family
              </option>

              <option value="Romantic">
                Romantic
              </option>

              <option value="Solo">
                Solo
              </option>

              <option value="Friends">
                Friends
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Creating Trip..."
              : "Create My Trip"}
          </button>

          {/* Success / Error Message */}
          {message && (
            <p className="mt-4 text-center font-medium">
              {message}
            </p>
          )}

        </form>
      </div>
    </main>
  );
}