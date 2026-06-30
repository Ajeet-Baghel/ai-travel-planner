"use client";

import { useState } from "react";
import cities from "cities-list";
import Navbar from "@/components/Navbar";

type TravelPlan = {
  itinerary?: {
    day: number;
    activities: string[];
  }[];
  hotels?: string[];
  visitingPlaces?: string[];
  budgetEstimate?: {
    flights?: string;
    hotel?: string;
    food?: string;
    activities?: string;
    total?: string;
  };
};

const budgetOptions = ["Cheap", "Moderate", "Luxury"];

const buildFallbackPlan = (
  destination: string,
  days: string,
  budget: string,
  interests: string
): TravelPlan => {
  const totalDays = Number(days) || 3;
  const interestText = interests || "local food, culture, and sightseeing";

  return {
    itinerary: Array.from({ length: totalDays }, (_, index) => ({
      day: index + 1,
      activities: [
        `Morning: visit a top ${destination} attraction with a ${budget.toLowerCase()} budget plan`,
        `Afternoon: explore ${interestText} experiences around ${destination}`,
        "Evening: enjoy a local food area and a relaxed walk",
      ],
    })),
    hotels: [
      `${budget} hotel near ${destination} city center`,
      `${budget} stay close to major attractions`,
      `${budget} accommodation with good traveler reviews`,
    ],
    visitingPlaces: [
      `${destination} main market`,
      `${destination} historical landmark`,
      `${destination} viewpoint`,
      `${destination} food street`,
    ],
    budgetEstimate: {
      flights: "Depends on departure city and dates",
      hotel: `${budget} stay estimate`,
      food: `${budget} meal estimate`,
      activities: `${budget} sightseeing estimate`,
      total: "Final cost depends on season and booking choices",
    },
  };
};

const hasGeneratedDetails = (plan: TravelPlan) =>
  Boolean(plan.itinerary?.length || plan.hotels?.length || plan.visitingPlaces?.length);

const completePlan = (
  plan: TravelPlan,
  destination: string,
  days: string,
  budget: string,
  interests: string
): TravelPlan => {
  const fallback = buildFallbackPlan(destination, days, budget, interests);

  return {
    ...plan,
    itinerary: plan.itinerary?.length ? plan.itinerary : fallback.itinerary,
    hotels: plan.hotels?.length ? plan.hotels : fallback.hotels,
    visitingPlaces: plan.visitingPlaces?.length ? plan.visitingPlaces : fallback.visitingPlaces,
    budgetEstimate: plan.budgetEstimate || fallback.budgetEstimate,
  };
};

export default function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("Moderate");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState<TravelPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = (value: string) => {
    setDestination(value);

    if (value.length > 1) {
      const cityList = Object.keys(cities);
      const filtered = cityList
        .filter((city) => city.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);

      setSuggestions(filtered);
      return;
    }

    setSuggestions([]);
  };

  const handleGenerate = async () => {
    if (!destination || !days) {
      setMessage("Please enter a destination and number of days.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trip/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          destination,
          days,
          budget,
          interests,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(buildFallbackPlan(destination, days, budget, interests));
        setMessage(data.msg || "API failed, so a local trip plan was generated.");
        return;
      }

      if (!hasGeneratedDetails(data)) {
        setResult(buildFallbackPlan(destination, days, budget, interests));
        setMessage("The API returned an empty plan, so a local trip plan was generated.");
        return;
      }

      setResult(completePlan(data, destination, days, budget, interests));
    } catch (error) {
      console.error(error);
      setMessage("Could not generate the trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
            AI trip builder
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-950">
            Tell us your travel preferences
          </h1>
          <p className="mt-3 text-slate-600">
            We will generate itinerary ideas, hotels, visiting places, and budget estimates.
          </p>
        </div>

        <section className="mx-auto max-w-2xl rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
          <label className="mb-2 block font-semibold text-slate-700">Destination</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter city"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              value={destination}
              onChange={(event) => handleSearch(event.target.value)}
            />

            {suggestions.length > 0 && (
              <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                {suggestions.map((city) => (
                  <li
                    key={city}
                    className="cursor-pointer p-3 hover:bg-teal-50"
                    onClick={() => {
                      setDestination(city);
                      setSuggestions([]);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-semibold text-slate-700">How many days?</span>
              <input
                type="number"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
                value={days}
                onChange={(event) => setDays(event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-slate-700">Interests</span>
              <input
                type="text"
                placeholder="Food, beaches, history"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
                value={interests}
                onChange={(event) => setInterests(event.target.value)}
              />
            </label>
          </div>

          <div className="mt-4">
            <p className="mb-2 font-semibold text-slate-700">Budget</p>
            <div className="grid grid-cols-3 gap-3">
              {budgetOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setBudget(option)}
                  className={`rounded-xl border p-3 font-semibold transition ${
                    budget === option
                      ? "border-teal-600 bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {message && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {message}
            </p>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-slate-950 p-3 font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Generating..." : "Generate Trip"}
          </button>
        </section>

        {result && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                AI generated plan
              </p>
              <h2 className="mb-5 mt-2 text-2xl font-bold text-slate-950">Itinerary</h2>

              {result.itinerary?.length ? (
                <div className="space-y-4">
                  {result.itinerary.map((day) => (
                    <div key={day.day} className="rounded-2xl border border-slate-200 p-4">
                      <h3 className="mb-3 font-semibold text-slate-950">Day {day.day}</h3>
                      <ul className="space-y-2 text-slate-700">
                        {day.activities.map((activity, index) => (
                          <li key={index} className="rounded-xl bg-slate-50 px-3 py-2">
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-slate-50 p-4 text-slate-600">
                  No itinerary was generated. Try generating the trip again.
                </p>
              )}
            </section>

            <aside className="space-y-6">
              <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
                <h2 className="mb-4 text-xl font-bold text-slate-950">Hotel suggestions</h2>
                {result.hotels?.length ? (
                  <ul className="space-y-2 text-slate-700">
                    {result.hotels.map((hotel, index) => (
                      <li key={index} className="rounded-xl bg-blue-50 px-3 py-2">
                        {hotel}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-600">No hotels were suggested.</p>
                )}
              </section>

              <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
                <h2 className="mb-4 text-xl font-bold text-slate-950">Visiting places</h2>
                {result.visitingPlaces?.length ? (
                  <ul className="space-y-2 text-slate-700">
                    {result.visitingPlaces.map((place, index) => (
                      <li key={index} className="rounded-xl bg-green-50 px-3 py-2">
                        {place}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-600">No visiting places were suggested.</p>
                )}
              </section>

              {result.budgetEstimate && (
                <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
                  <h2 className="mb-4 text-xl font-bold text-slate-950">Budget estimate</h2>
                  <div className="space-y-2 text-sm text-slate-700">
                    {Object.entries(result.budgetEstimate).map(([label, value]) => (
                      <p
                        key={label}
                        className="flex justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2"
                      >
                        <span className="font-semibold capitalize text-slate-900">{label}</span>
                        <span className="text-right">{value || "Not available"}</span>
                      </p>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
