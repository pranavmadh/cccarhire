import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehiclesGrid from "@/components/VehiclesGrid";

export const metadata: Metadata = {
  title: "Rent a Car in Praslin Island | Vehicles | CC CarHire Praslin",
  description: "Browse our full fleet of rental cars in Praslin Island, Seychelles. SUVs, hatchbacks & compact cars — automatic, air-conditioned, fully insured. Book online today.",
};

export default function VehiclesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">

        {/* Page header */}
        <div className="bg-white border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <p className="font-poppins text-sm font-bold uppercase tracking-wider text-brand-blue">
              Our Fleet
              <span className="mt-2 block h-0.5 w-10 rounded-full bg-brand-yellow" />
            </p>
            <h1 className="font-poppins mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              All Vehicles
            </h1>
            <p className="mt-3 max-w-2xl text-base text-gray-500 sm:text-lg">
              Well-maintained, fully insured cars available for rental across Praslin Island.
              All vehicles are automatic with air conditioning.
            </p>
          </div>
        </div>

        {/* Grid + filters */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <Suspense fallback={<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[1,2,3,4,5,6].map(i=><div key={i} className="h-[400px] animate-pulse rounded-3xl bg-gray-100"/>)}</div>}>
            <VehiclesGrid />
          </Suspense>
        </div>

      </main>
      <Footer />
    </>
  );
}
