"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type ItineraryDay = {
  day: number;
  activities: string[];
};

type BudgetEstimate =
  | Record<string, string | number | null | undefined>
  | string
  | null
  | undefined;

type Trip = {
  _id: string;
  destination: string;
  days: number | string;
  budget?: string;
  interests?: string;
  itinerary?: ItineraryDay[];
  hotels?: string[];
  visitingPlaces?: string[];
  budgetEstimate?: BudgetEstimate;
  createdAt?: string;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const formatBudgetEstimate = (budgetEstimate: BudgetEstimate) => {
  if (!budgetEstimate) {
    return [];
  }

  if (typeof budgetEstimate === "string") {
    return [["estimate", budgetEstimate] as const];
  }

  return Object.entries(budgetEstimate).filter(([, value]) => value);
};

export default function TripDetailsPage({ params }: PageProps) {
  const [tripId, setTripId] = useState("");
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    params.then(({ id }) => setTripId(id));
  }, [params]);

  useEffect(() => {
    if (!tripId) {
      return;
    }

    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("Please log in to view this trip.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trip/${tripId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.msg || "Trip not found.");
          return;
        }

        setTrip(data);
      } catch (error) {
        console.error(error);
        setMessage("Could not load this trip.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

  const budgetEntries = formatBudgetEstimate(trip?.budgetEstimate);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <a href="/dashboard" className="mb-6 inline-flex font-semibold text-teal-700 hover:text-teal-900">
          Back to dashboard
        </a>

        {loading ? (
          <p className="rounded-2xl bg-white p-6 text-slate-600 shadow-sm">Loading trip...</p>
        ) : message ? (
          <section className="rounded-[28px] bg-white p-8 shadow-xl shadow-slate-200/70">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
              Trip details
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">{message}</h1>
            <p className="mt-4 text-slate-600">
              Return to the dashboard and choose one of your saved trips.
            </p>
          </section>
        ) : trip ? (
          <>
            <section className="rounded-[28px] bg-white p-8 shadow-xl shadow-slate-200/70">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                Saved trip
              </p>
              <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-slate-950">{trip.destination}</h1>
                  <p className="mt-3 text-slate-600">
                    {trip.days} days
                    {trip.budget ? ` · ${trip.budget} budget` : ""}
                    {trip.interests ? ` · ${trip.interests}` : ""}
                  </p>
                </div>
                {trip.createdAt && (
                  <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
                    Created {new Date(trip.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </section>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                  Itinerary
                </p>
                {trip.itinerary?.length ? (
                  <div className="mt-5 space-y-4">
                    {trip.itinerary.map((day) => (
                      <article key={day.day} className="rounded-2xl border border-slate-200 p-4">
                        <h2 className="font-semibold text-slate-950">Day {day.day}</h2>
                        <ul className="mt-3 space-y-2 text-slate-700">
                          {day.activities.map((activity, index) => (
                            <li key={index} className="rounded-xl bg-slate-50 px-3 py-2">
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="mt-5 rounded-xl bg-slate-50 p-4 text-slate-600">
                    No itinerary details were saved for this trip.
                  </p>
                )}
              </section>

              <aside className="space-y-6">
                <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
                  <h2 className="text-xl font-bold text-slate-950">Hotels</h2>
                  {trip.hotels?.length ? (
                    <ul className="mt-4 space-y-2 text-slate-700">
                      {trip.hotels.map((hotel, index) => (
                        <li key={index} className="rounded-xl bg-blue-50 px-3 py-2">
                          {hotel}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-slate-600">No hotels were saved.</p>
                  )}
                </section>

                <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
                  <h2 className="text-xl font-bold text-slate-950">Places</h2>
                  {trip.visitingPlaces?.length ? (
                    <ul className="mt-4 space-y-2 text-slate-700">
                      {trip.visitingPlaces.map((place, index) => (
                        <li key={index} className="rounded-xl bg-green-50 px-3 py-2">
                          {place}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-slate-600">No places were saved.</p>
                  )}
                </section>

                {budgetEntries.length > 0 && (
                  <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
                    <h2 className="text-xl font-bold text-slate-950">Budget estimate</h2>
                    <div className="mt-4 space-y-2 text-sm text-slate-700">
                      {budgetEntries.map(([label, value]) => (
                        <p
                          key={label}
                          className="flex justify-between gap-4 rounded-xl bg-slate-50 px-3 py-2"
                        >
                          <span className="font-semibold capitalize text-slate-900">{label}</span>
                          <span className="text-right">{value}</span>
                        </p>
                      ))}
                    </div>
                  </section>
                )}
              </aside>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
