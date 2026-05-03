"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b">
      <h1 className="font-bold text-lg">🌍 AI Travel Planner</h1>

      <div className="flex gap-3">
        {!loggedIn ? (
          <>
            <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
              Login
            </a>
            <a href="/register" className="bg-green-500 text-white px-4 py-2 rounded">
              Register
            </a>
          </>
        ) : (
          <>
            <a href="/dashboard" className="bg-purple-500 text-white px-4 py-2 rounded">
              Dashboard
            </a>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}