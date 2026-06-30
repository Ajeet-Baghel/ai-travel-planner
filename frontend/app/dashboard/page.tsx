"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  location: string;
};

type Trip = {
  _id: string;
  destination: string;
  days: number | string;
  budget?: string;
  interests?: string;
  createdAt?: string;
};

const defaultProfile: UserProfile = {
  name: "Travel Explorer",
  email: "traveler@example.com",
  phone: "",
  location: "",
};

const emptyTrip = {
  destination: "",
  days: "",
  budget: "Moderate",
  interests: "",
};

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [profileDraft, setProfileDraft] = useState<UserProfile>(defaultProfile);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tripDraft, setTripDraft] = useState(emptyTrip);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const totalDays = useMemo(
    () => trips.reduce((sum, trip) => sum + Number(trip.days || 0), 0),
    [trips]
  );

  useEffect(() => {
    const savedProfile = localStorage.getItem("dashboardProfile");

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile) as UserProfile;
      setProfile(parsedProfile);
      setProfileDraft(parsedProfile);
    }

    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trip/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setTrips(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setMessage("Could not load saved trips.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleProfileSave = () => {
    setProfile(profileDraft);
    localStorage.setItem("dashboardProfile", JSON.stringify(profileDraft));
    setIsEditingProfile(false);
    setMessage("Profile updated successfully.");
  };

  const handleAddTrip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!tripDraft.destination || !tripDraft.days) {
      setMessage("Please add destination and days.");
      return;
    }

    const newTrip: Trip = {
      _id: `local-${Date.now()}`,
      destination: tripDraft.destination,
      days: tripDraft.days,
      budget: tripDraft.budget,
      interests: tripDraft.interests,
      createdAt: new Date().toISOString(),
    };

    setTrips((currentTrips) => [newTrip, ...currentTrips]);
    setTripDraft(emptyTrip);
    setMessage("Trip added to dashboard.");
  };

  const handleRemoveTrip = (tripId: string) => {
    setTrips((currentTrips) => currentTrips.filter((trip) => trip._id !== tripId));
    setMessage("Trip removed from dashboard.");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
              Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-950">Manage your travel plans</h1>
            <p className="mt-3 text-slate-600">
              Edit user information, add new trips, and remove trips from one place.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
              <p className="text-2xl font-bold text-slate-950">{trips.length}</p>
              <p className="text-sm text-slate-500">Trips</p>
            </div>
            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
              <p className="text-2xl font-bold text-slate-950">{totalDays}</p>
              <p className="text-sm text-slate-500">Days</p>
            </div>
          </div>
        </div>

        {message && (
          <p className="mb-6 rounded-2xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
            {message}
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                  User information
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">{profile.name}</h2>
              </div>
              <button
                onClick={() => setIsEditingProfile((editing) => !editing)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
              >
                {isEditingProfile ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="space-y-4">
              {(["name", "email", "phone", "location"] as const).map((field) => (
                <label key={field} className="block">
                  <span className="mb-2 block text-sm font-semibold capitalize text-slate-600">
                    {field}
                  </span>
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={profileDraft[field]}
                    disabled={!isEditingProfile}
                    onChange={(event) =>
                      setProfileDraft((currentProfile) => ({
                        ...currentProfile,
                        [field]: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none transition disabled:cursor-not-allowed disabled:text-slate-500 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
                    placeholder={`Enter ${field}`}
                  />
                </label>
              ))}
            </div>

            {isEditingProfile && (
              <button
                onClick={handleProfileSave}
                className="mt-6 w-full rounded-xl bg-teal-600 p-3 font-semibold text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-0.5 hover:bg-teal-700"
              >
                Save Information
              </button>
            )}
          </section>

          <section className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              Trip details
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Add a trip</h2>

            <form onSubmit={handleAddTrip} className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Destination"
                value={tripDraft.destination}
                onChange={(event) =>
                  setTripDraft((currentTrip) => ({
                    ...currentTrip,
                    destination: event.target.value,
                  }))
                }
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
              <input
                type="number"
                placeholder="Days"
                value={tripDraft.days}
                onChange={(event) =>
                  setTripDraft((currentTrip) => ({
                    ...currentTrip,
                    days: event.target.value,
                  }))
                }
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
              <select
                value={tripDraft.budget}
                onChange={(event) =>
                  setTripDraft((currentTrip) => ({
                    ...currentTrip,
                    budget: event.target.value,
                  }))
                }
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              >
                <option>Cheap</option>
                <option>Moderate</option>
                <option>Luxury</option>
              </select>
              <input
                type="text"
                placeholder="Interests"
                value={tripDraft.interests}
                onChange={(event) =>
                  setTripDraft((currentTrip) => ({
                    ...currentTrip,
                    interests: event.target.value,
                  }))
                }
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
              <button
                type="submit"
                className="rounded-xl bg-slate-950 p-3 font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-teal-700 md:col-span-2"
              >
                Add Trip
              </button>
            </form>
          </section>
        </div>

        <section className="mt-6 rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                Saved trips
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">Your trip list</h2>
            </div>
          </div>

          {loading ? (
            <p className="rounded-2xl bg-slate-50 p-5 text-slate-600">Loading trips...</p>
          ) : trips.length === 0 ? (
            <p className="rounded-2xl bg-slate-50 p-5 text-slate-600">
              No trips yet. Add your first destination above.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <article
                  key={trip._id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-teal-300 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">{trip.destination}</h3>
                      <p className="mt-1 text-sm text-slate-500">{trip.days} days</p>
                    </div>
                    <button
                      onClick={() => handleRemoveTrip(trip._id)}
                      className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-800">Budget:</span>{" "}
                      {trip.budget || "Not selected"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">Interests:</span>{" "}
                      {trip.interests || "Not added"}
                    </p>
                  </div>
                  {!trip._id.startsWith("local-") && (
                    <a
                      href={`/trip/${trip._id}`}
                      className="mt-5 inline-flex font-semibold text-teal-700 hover:text-teal-900"
                    >
                      View details
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
