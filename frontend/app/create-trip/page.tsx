"use client";
import { useState } from "react";
import cities from "cities-list";

export default function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value: string) => {
    setDestination(value);

    if (value.length > 1) {
      const cityList = Object.keys(cities);

      const filtered = cityList
        .filter((city) =>
          city.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);

      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // 🔥 API CALL FUNCTION
  const handleGenerate = async () => {
    try {
      setLoading(true);

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
      setResult(data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold text-center mb-2">
        Tell us your travel preferences 🌴
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Provide details and we’ll generate your personalized trip plan
      </p>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* Destination with autocomplete */}
        <label className="block mb-2 font-medium">
          What is your destination?
        </label>

        <div className="relative">
          <input
            type="text"
            placeholder="Enter city"
            className="w-full p-2 border rounded"
            value={destination}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {suggestions.length > 0 && (
            <ul className="absolute bg-white border w-full mt-1 rounded shadow z-10">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
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

        {/* Days */}
        <label className="block mb-2 font-medium mt-4">
          How many days?
        </label>
        <input
          type="number"
          className="w-full p-2 border rounded mb-4"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        {/* Budget */}
        <label className="block mb-2 font-medium">
          Budget
        </label>
        <div className="grid grid-cols-3 gap-3 mb-4">

          <button onClick={() => setBudget("Cheap")} className="border p-3 rounded hover:bg-gray-100">
            💸 Cheap
          </button>

          <button onClick={() => setBudget("Moderate")} className="border p-3 rounded hover:bg-gray-100">
            💰 Moderate
          </button>

          <button onClick={() => setBudget("Luxury")} className="border p-3 rounded hover:bg-gray-100">
            💎 Luxury
          </button>

        </div>

        {/* Interests */}
        <label className="block mb-2 font-medium">
          Interests
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Generating..." : "Generate Trip 🚀"}
        </button>
      </div>

      {/* 🔥 RESULT SECTION */}
      {result && (
        <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">📅 Itinerary</h2>

          {result.itinerary?.map((day: any) => (
            <div key={day.day} className="mb-3">
              <h3 className="font-semibold">Day {day.day}</h3>
              <ul>
                {day.activities.map((act: string, i: number) => (
                  <li key={i}>• {act}</li>
                ))}
              </ul>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-4">🏨 Hotels</h2>
          <ul>
            {result.hotels?.map((hotel: string, i: number) => (
              <li key={i}>• {hotel}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}