export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          🌍 AI Travel Planner
        </h1>

        <p className="text-gray-600 mb-6">
          Plan your perfect trip with AI in seconds
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Login
          </a>

          <a
            href="/register"
            className="bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            Register
          </a>

          <a
            href="/dashboard"
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded"
          >
            Dashboard
          </a>
        </div>

      </div>
    </div>
  );
}