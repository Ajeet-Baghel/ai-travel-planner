// export default function Home() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-xl p-8 text-center w-full max-w-md">

//         <h1 className="text-3xl font-bold mb-6">
//           🌍 AI Travel Planner
//         </h1>

//         <p className="text-gray-600 mb-6">
//           Plan your perfect trip with AI in seconds
//         </p>

//         <div className="flex flex-col gap-3">
//           <a
//             href="/login"
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
//           >
//             Login
//           </a>

//           <a
//             href="/register"
//             className="bg-green-500 hover:bg-green-600 text-white py-2 rounded"
//           >
//             Register
//           </a>

//           <a
//             href="/dashboard"
//             className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded"
//           >
//             Dashboard
//           </a>
//         </div>

//       </div>
//     </div>
//   );
// }

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-xl font-bold">🌍 AI Travel Planner</h1>
        <a
          href="/login"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Sign In
        </a>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 mt-20">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="text-red-500">
            Discover Your Next Adventure with AI:
          </span>
          <br />
          Personalized Itineraries at Your Fingertips
        </h1>

        <p className="text-gray-600 mt-6 max-w-2xl">
          Your personal trip planner that creates custom travel itineraries
          based on your interests, budget, and destination.
        </p>

        <a
          href="/register"
          className="mt-8 bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
        >
          Get Started, It’s Free 🚀
        </a>
      </div>

      {/* Optional Preview Section */}
      <div className="mt-20 flex justify-center">
        <div className="w-[90%] max-w-4xl bg-gray-100 p-6 rounded-xl shadow">
          <p className="text-center text-gray-500">
            ✨ Your generated trip plans will appear here
          </p>
        </div>
      </div>

    </div>
  );
}