'use client';

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Vehicle } from "@/lib/types/vehicle";

type Category = "all" | "suv" | "hatchback" | "compact" | "automatic";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All Vehicles" },
  { id: "suv", label: "SUV" },
  { id: "hatchback", label: "Hatchback" },
  { id: "compact", label: "Compact" },
  { id: "automatic", label: "Automatic" },
];

function filterVehicles(list: Vehicle[], category: Category): Vehicle[] {
  if (category === "all") return list;
  if (category === "automatic") return list.filter((v) => v.transmission === "Automatic");
  return list.filter((v) => v.category === category);
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.15 1.199l-1.27 1.27a7.002 7.002 0 0 1 0 2.828l1.27 1.27a1 1 0 0 1 .15 1.199l-1.18 2.044a1 1 0 0 1-1.186.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .15-1.199l1.27-1.27a7.002 7.002 0 0 1 0-2.828l-1.27-1.27a1 1 0 0 1-.15-1.199l1.18-2.044a1 1 0 0 1 1.186-.447l1.598.54A6.993 6.993 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM16 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.5 18a4.5 4.5 0 0 1 9 0v.75H5.5V18Z" />
    </svg>
  );
}

function SnowflakeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path strokeLinecap="round" d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

function FuelIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
      <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
  );
}


export default function VehiclesGrid() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const searchParams = useSearchParams();
  const bookingQuery = searchParams.toString() ? `?${searchParams.toString()}` : "";

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/vehicles");
        const data = await res.json();
        if (res.ok) setVehicles(data.vehicles);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = filterVehicles(vehicles, activeCategory);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {categories.map(({ id, label }) => {
          const isActive = activeCategory === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveCategory(id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors sm:px-5 ${
                isActive
                  ? "bg-brand-blue text-white shadow-sm"
                  : "border border-gray-200 bg-white text-brand-blue hover:border-brand-blue/30"
              }`}
            >
              {label}
            </button>
          );
        })}
        {!loading && (
          <span className="ml-auto text-sm text-gray-400">
            {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="mt-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-gray-500">No vehicles in this category yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((vehicle) => (
              <article
                key={vehicle.id}
                className="rounded-3xl bg-white shadow-md ring-1 ring-gray-100 transition-shadow hover:shadow-lg"
              >
                {/* Top row: Popular badge + heart */}
                <div className="flex items-center justify-between px-4 pt-4">
                  {vehicle.popular ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">
                      <StarIcon className="h-3 w-3" />
                      Popular
                    </span>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    aria-label="Save to wishlist"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:text-red-400"
                  >
                    <HeartIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* Car image */}
                <div className="relative mx-4 h-44">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Info */}
                <div className="px-4 pb-4">
                  <h2 className="font-poppins text-lg font-bold text-gray-900">{vehicle.name}</h2>
                  <p className="text-sm text-gray-400">{vehicle.type}</p>

                  {/* Specs row */}
                  <div className="mt-4 flex items-center justify-around border-t border-gray-100 pt-4">
                    <div className="flex flex-col items-center gap-1">
                      <UsersIcon className="h-5 w-5 text-brand-blue" />
                      <span className="text-xs font-medium text-gray-600">{vehicle.seats} Seats</span>
                    </div>
                    <div className="h-8 w-px bg-gray-200" />
                    <div className="flex flex-col items-center gap-1">
                      <GearIcon className="h-5 w-5 text-brand-blue" />
                      <span className="text-xs font-medium text-gray-600">{vehicle.transmission}</span>
                    </div>
                    <div className="h-8 w-px bg-gray-200" />
                    <div className="flex flex-col items-center gap-1">
                      <FuelIcon className="h-5 w-5 text-brand-blue" />
                      <span className="text-xs font-medium text-gray-600">Petrol</span>
                    </div>
                    {vehicle.airConditioning && (
                      <>
                        <div className="h-8 w-px bg-gray-200" />
                        <div className="flex flex-col items-center gap-1">
                          <SnowflakeIcon className="h-5 w-5 text-brand-blue" />
                          <span className="text-xs font-medium text-gray-600">A/C</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-xs text-gray-400">Starting from</p>
                      <p className="font-poppins leading-none">
                        <span className="text-2xl font-bold text-gray-900">€{vehicle.price}</span>
                        <span className="text-sm text-gray-400"> / day</span>
                      </p>
                      {vehicle.discountedPrice && vehicle.discountedMinDays && (
                        <p className="mt-0.5 text-xs font-medium text-green-600">
                          €{vehicle.discountedPrice}/day ({vehicle.discountedMinDays}+ days)
                        </p>
                      )}
                    </div>
                    <Link
                      href={`/vehicles/${vehicle.id}${bookingQuery}`}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
                    >
                      Book Now
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
