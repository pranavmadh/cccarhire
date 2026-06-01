import Link from "next/link";
import { getAllVehicles } from "@/lib/vehicles";
import { getAllChauffeurCars } from "@/lib/chauffeur-cars";
import { logoutAction } from "@/app/actions/admin-auth";

export default async function AdminDashboardPage() {
  const [vehicles, chauffeurCars] = await Promise.all([
    getAllVehicles(),
    getAllChauffeurCars(),
  ]);

  return (
    <div className="min-h-screen bg-[#f7f8fc]">

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-4 px-6 py-3.5">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="font-poppins text-lg font-bold text-gray-900 leading-tight">Admin Dashboard</h1>
              <p className="text-xs text-gray-400">CC Carhire Praslin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
              </svg>
              View Site
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </form>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue font-poppins text-sm font-bold text-white shrink-0">A</div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <h2 className="font-poppins text-2xl font-bold text-gray-900 sm:text-3xl">Welcome back 👋</h2>
          <p className="mt-1 text-gray-500 text-sm sm:text-base">Manage your fleet and chauffeur cars from here.</p>
        </div>

        {/* Stats row */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Vehicles", value: vehicles.length, color: "bg-brand-blue" },
            { label: "Chauffeur Cars", value: chauffeurCars.length, color: "bg-blue-500" },
            { label: "Featured", value: vehicles.filter((v) => v.popular).length, color: "bg-brand-yellow" },
            { label: "Total Fleet", value: vehicles.length + chauffeurCars.length, color: "bg-gray-800" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-white" aria-hidden>
                  <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 0 0 2 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 0 0 6.5 3ZM2 12v2.5A1.5 1.5 0 0 0 3.5 16h.041a3 3 0 0 1 5.918 0h.791a.75.75 0 0 0 .75-.75V12H2Zm13 0h-1.5v2.5a.75.75 0 0 0 .75.75h.75A1.5 1.5 0 0 0 16.5 14V12h-1.5Zm0-9.5c-.51 0-1.017.01-1.521.03l-.479.02V10.5H16V4.606c0-.771-.59-1.43-1.375-1.489A23.138 23.138 0 0 0 13 2.5Z" />
                </svg>
              </div>
              <p className="font-poppins text-2xl font-bold text-gray-900">{value}</p>
              <p className="mt-0.5 text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Navigation cards */}
        <div className="grid gap-6 sm:grid-cols-2">

          {/* Vehicles */}
          <Link
            href="/admin/vehicles"
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:ring-brand-blue/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
                  <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                  <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                  <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-gray-300 group-hover:text-brand-blue transition-colors" aria-hidden>
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mt-5">
              <h3 className="font-poppins text-xl font-bold text-gray-900">Rental Vehicles</h3>
              <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                Add, manage and remove self-drive rental cars. Set pricing, features, and images.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
                {vehicles.length} cars
              </span>
              {vehicles.filter((v) => v.popular).length > 0 && (
                <span className="rounded-full bg-brand-yellow/20 px-3 py-1 text-xs font-semibold text-yellow-700">
                  {vehicles.filter((v) => v.popular).length} featured
                </span>
              )}
            </div>
          </Link>

          {/* Chauffeur */}
          <Link
            href="/admin/chauffeur"
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:ring-brand-blue/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-gray-300 group-hover:text-brand-blue transition-colors" aria-hidden>
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mt-5">
              <h3 className="font-poppins text-xl font-bold text-gray-900">Chauffeur Cars</h3>
              <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                Add, manage and remove chauffeur-driven cars. Set pricing and passenger capacity.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
                {chauffeurCars.length} cars
              </span>
            </div>
          </Link>

        </div>

        {/* Quick links */}
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <h3 className="font-poppins text-sm font-semibold text-gray-700 mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/vehicles" className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:border-brand-blue/30 hover:text-brand-blue transition-colors">
              View Vehicles Page
            </Link>
            <Link href="/chauffeur" className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:border-brand-blue/30 hover:text-brand-blue transition-colors">
              View Chauffeur Page
            </Link>
            <Link href="/" className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:border-brand-blue/30 hover:text-brand-blue transition-colors">
              View Homepage
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
