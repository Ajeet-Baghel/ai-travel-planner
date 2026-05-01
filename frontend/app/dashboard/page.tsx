"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/trip/create", {
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
        throw new Error(data.msg || "Something went wrong");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl">
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-4 w-full">
          Logout
        </button>

        <h1 className="text-2xl font-bold text-center mb-6">
          🌍 AI Travel Planner
        </h1>

        <div className="space-y-3">
          <input
            placeholder="Destination"
            className="w-full p-2 border rounded"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <input
            placeholder="Days"
            className="w-full p-2 border rounded"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />

          <input
            placeholder="Budget"
            className="w-full p-2 border rounded"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

          <input
            placeholder="Interests"
            className="w-full p-2 border rounded"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white p-2 w-full mt-4 rounded">
          {loading ? "Generating..." : "Generate Trip ✈️"}
        </button>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        {/* Result */}
        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-bold mb-3">📅 Itinerary</h2>

            {result.itinerary?.map((day: any) => (
              <div key={day.day} className="mb-3">
                <h3 className="font-semibold text-blue-600">Day {day.day}</h3>
                <ul className="list-disc ml-5">
                  {day.activities.map((act: string, i: number) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h2 className="text-xl font-bold mt-4">🏨 Hotels</h2>
            <ul className="list-disc ml-5">
              {result.hotels?.map((hotel: string, i: number) => (
                <li key={i}>{hotel}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
