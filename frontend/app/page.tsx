const pageLinks = [
  {
    title: "Create an account",
    description: "Start with a polished register page and save your trip plans.",
    href: "/register",
    action: "Open Register",
  },
  {
    title: "Sign in",
    description: "Return to your planner and continue building upcoming trips.",
    href: "/login",
    action: "Open Login",
  },
  {
    title: "Plan a trip",
    description: "Choose a destination, days, budget, and interests for your itinerary.",
    href: "/create-trip",
    action: "Open Planner",
  },
  {
    title: "View dashboard",
    description: "Browse saved trips and reopen your previous travel plans.",
    href: "/dashboard",
    action: "Open Dashboard",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section
        className="relative flex min-h-screen items-center bg-cover bg-center px-6 py-20"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(4, 18, 27, 0.92), rgba(8, 54, 69, 0.7), rgba(252, 176, 69, 0.28)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85')",
        }}
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
              AI Travel Planner
            </p>
            <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
              See every part of your trip planner as you scroll.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              Register, log in, create a trip, and review saved journeys from one smooth
              multi-page app experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/register"
                className="rounded-xl bg-teal-500 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-teal-950/30 transition hover:-translate-y-0.5 hover:bg-teal-300"
              >
                Get Started
              </a>
              <a
                href="#pages"
                className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Explore Pages
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/20 bg-white/12 p-6 shadow-2xl shadow-black/30 backdrop-blur-md">
            <div className="rounded-2xl bg-white p-5 text-slate-900">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700">Next trip</p>
                  <h2 className="text-2xl font-bold">Bali, Indonesia</h2>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                  5 days
                </span>
              </div>
              <div className="space-y-3">
                {["Beach sunrise", "Local food trail", "Temple visit"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3"
                  >
                    <span className="font-medium">{item}</span>
                    <span className="text-sm text-slate-500">Planned</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pages" className="bg-white px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
              App pages
            </p>
            <h2 className="text-4xl font-bold">Scroll through the full journey</h2>
            <p className="mt-4 text-slate-600">
              Each section below represents one important page in your travel planner.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {pageLinks.map((page) => (
              <a
                key={page.href}
                href={page.href}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:bg-white hover:shadow-xl"
              >
                <h3 className="text-2xl font-bold">{page.title}</h3>
                <p className="mt-3 min-h-12 text-slate-600">{page.description}</p>
                <span className="mt-6 inline-flex font-semibold text-teal-700 group-hover:text-teal-900">
                  {page.action}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-20 text-slate-950">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-8 shadow-xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
              Auth pages
            </p>
            <h2 className="text-3xl font-bold">Login and register look connected.</h2>
            <p className="mt-4 text-slate-600">
              Users can move between login and register from inside the cards, then continue
              into the planner after success.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="/login" className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white">
                Login
              </a>
              <a href="/register" className="rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white">
                Register
              </a>
            </div>
          </div>

          <div className="rounded-[28px] bg-slate-950 p-8 text-white shadow-xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Trip builder
            </p>
            <h2 className="text-3xl font-bold">Create custom itineraries.</h2>
            <p className="mt-4 text-slate-300">
              The planner collects destination, duration, budget, and interests before
              generating hotels and daily activities.
            </p>
            <a
              href="/create-trip"
              className="mt-6 inline-flex rounded-xl bg-teal-400 px-5 py-3 font-semibold text-slate-950"
            >
              Create Trip
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Dashboard
          </p>
          <h2 className="text-4xl font-bold">Saved trips stay one click away.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            After planning, users can return to the dashboard to review destinations,
            trip length, and previous generated itineraries.
          </p>
          <a
            href="/dashboard"
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
          >
            View Dashboard
          </a>
        </div>
      </section>
    </main>
  );
}
