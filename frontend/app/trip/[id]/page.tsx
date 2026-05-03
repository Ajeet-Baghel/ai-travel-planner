"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trip/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTrip(data);
    };

    if (id) fetchTrip();
  }, [id]);

  if (!trip) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-2">
          🌍 {trip.destination}
        </h1>

        <p className="text-gray-600 mb-4">
          {trip.days} Days Trip
        </p>

        {/* Itinerary */}
        <h2 className="text-xl font-bold mb-2">📅 Itinerary</h2>

        {trip.itinerary?.map((day: any) => (
          <div key={day.day} className="mb-4">
            <h3 className="font-semibold">Day {day.day}</h3>
            <ul>
              {day.activities.map((act: string, i: number) => (
                <li key={i}>• {act}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Hotels */}
        <h2 className="text-xl font-bold mt-4 mb-2">🏨 Hotels</h2>
        <ul>
          {trip.hotels?.map((hotel: string, i: number) => (
            <li key={i}>• {hotel}</li>
          ))}
        </ul>

      </div>
    </div>
  );
}