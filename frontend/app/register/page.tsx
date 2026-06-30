"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const handleRegister = async () => {
    setMessage("");

    try {
      console.log("Sending:", { name, email, password });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);
      if (res.ok) {
        setMessageType("success");
        setMessage("Register successfully");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      } else {
        setMessageType("error");
        setMessage(data.msg || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      setMessageType("error");
      setMessage("Registration Failed");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(6, 28, 36, 0.78), rgba(8, 61, 74, 0.42), rgba(255, 180, 95, 0.28)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85')",
      }}
    >
      <div className="w-full max-w-sm rounded-[28px] border border-white/35 bg-white/90 p-8 text-slate-900 shadow-2xl shadow-black/30 backdrop-blur-md">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
          Start exploring
        </p>
        <h2 className="mb-6 text-3xl font-bold">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="mb-4 w-full rounded-xl border border-slate-200 bg-white/95 p-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-xl border border-slate-200 bg-white/95 p-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-5 w-full rounded-xl border border-slate-200 bg-white/95 p-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full rounded-xl bg-teal-600 p-3 font-semibold text-white shadow-lg shadow-teal-900/25 transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-200">
          Register
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-teal-700 hover:text-teal-900">
            Login
          </a>
        </p>

        {message && (
          <p
            className={`mt-4 rounded-xl px-3 py-2 text-center text-sm font-medium ${
              messageType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
