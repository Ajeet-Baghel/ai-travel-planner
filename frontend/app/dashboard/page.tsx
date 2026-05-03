"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/trip/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTrips(data);
    };

    fetchTrips();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Trips</h1>

        {trips.map((trip) => (
          <div
            key={trip._id}
            className="border p-3 mb-3 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => (window.location.href = `/trip/${trip._id}`)}
          >
            <h2 className="font-semibold">{trip.destination}</h2>
            <p>{trip.days} days</p>
          </div>
        ))}
      </div>
    </div>
  );
}