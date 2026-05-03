"use client";

import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";
import cities from "cities-list";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const libraries = ["places"];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState<any>(null);
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

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
       
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-4 w-full">
          Logout
        </button>

        <h1 className="text-2xl font-bold text-center mb-6">
          🌍 AI Travel Planner
        </h1>

        <div className="space-y-3">
          
           {/* <LoadScript
  googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
  libraries={["places"]}
>
  <Autocomplete
    onLoad={(ref) => (autocompleteRef.current = ref)}
    onPlaceChanged={() => {
      const place = autocompleteRef.current.getPlace();
      setDestination(place.formatted_address || place.name);
    }}
  >
    <input
      type="text"
      placeholder="Search Destination"
      className="w-full p-2 border rounded mb-3"
      value={destination}
      onChange={(e) => setDestination(e.target.value)}
    />
  </Autocomplete>
</LoadScript> */}
          

          <div className="relative">
  <input
    type="text"
    placeholder="Search Destination"
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
