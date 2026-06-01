'use client';

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Vehicle } from "@/lib/types/vehicle";

type Category = "all" | "suv" | "hatchback" | "compact" | "automatic";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All Vehicles" },
  { id: "suv", label: "SUV" },
  { id: "hatchback", label: "Hatchback" },
  { id: "compact", label: "Compact" },
  { id: "automatic", label: "Automatic" },
];

const bottomFeatures = [
  {
    title: "Well Maintained",
    description: "All vehicles are regularly serviced and cleaned.",
    icon: (
      <path
        fillRule="evenodd"
        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516 11.209 11.209 0 0 1-7.877-3.08ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        clipRule="evenodd"
      />
    ),
  },
  {
    title: "Quality Assured",
    description: "Reliable cars for a safe and comfortable journey.",
    icon: (
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    ),
  },
  {
    title: "24/7 Support",
    description: "We're here to help you anytime, anywhere.",
    icon: (
      <path d="M4.5 6.375A4.125 4.125 0 0 1 8.625 2.25h6.75a4.125 4.125 0 0 1 4.125 4.125v6.75a4.125 4.125 0 0 1-4.125 4.125h-6.75A4.125 4.125 0 0 1 4.5 13.125v-6.75ZM9 8.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5H9.75a.75.75 0 0 1-.75-.75Z" />
    ),
  },
];

function filterVehicles(list: Vehicle[], category: Category): Vehicle[] {
  if (category === "all") return list;
  if (category === "automatic") return list.filter((v) => v.transmission === "Automatic");
  return list.filter((v) => v.category === category);
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
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

function FuelIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
      <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Z" clipRule="evenodd" />
    </svg>
  );
}

function VehicleCard({ vehicle, slider }: { vehicle: Vehicle; slider?: boolean }) {
  return (
    <article className={`overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-gray-100 ${slider ? "w-[calc(33.333%-14px)] min-w-[260px] shrink-0" : ""}`}>
      <div className="relative h-48 w-full">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover"
          sizes="300px"
        />
        {vehicle.popular && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">
              <StarIcon className="h-3 w-3" />
              Popular
            </span>
          </div>
        )}
      </div>
      <div className="px-4 pb-4 pt-4">
        <h3 className="font-poppins text-lg font-bold text-gray-900">{vehicle.name}</h3>
        <p className="text-sm text-gray-400">{vehicle.type}</p>
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
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-400">Starting from</p>
            <p className="font-poppins leading-none">
              <span className="text-2xl font-bold text-gray-900">€{vehicle.price}</span>
              <span className="text-sm text-gray-400"> / day</span>
            </p>
          </div>
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
          >
            Book Now
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadVehicles = useCallback(async () => {
    try {
      const res = await fetch("/api/vehicles");
      const data = await res.json();
      if (res.ok) setVehicles(data.vehicles);
    } catch {
      // ignore background refresh errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
    const id = setInterval(loadVehicles, 30_000);
    return () => clearInterval(id);
  }, [loadVehicles]);

  const filtered = filterVehicles(vehicles, activeCategory);
  const useSlider = filtered.length > 3;

  const handleCategoryChange = (id: Category) => {
    setActiveCategory(id);
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -(el.clientWidth * 0.85) : el.clientWidth * 0.85, behavior: "smooth" });
  }, []);

  return (
    <section id="vehicles" className="bg-white py-16 sm:py-20" aria-labelledby="vehicles-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-poppins text-sm font-bold uppercase tracking-wider text-brand-blue">
            Our Vehicles
            <span className="mx-auto mt-2 block h-0.5 w-10 rounded-full bg-brand-yellow" />
          </p>
          <h2 id="vehicles-heading" className="font-poppins mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Choose the Perfect Car for Your Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 sm:text-lg">
            A wide range of well-maintained vehicles to suit your needs and budget.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map(({ id, label }) => {
            const isActive = activeCategory === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleCategoryChange(id)}
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
        </div>

        <div className="relative mt-10">
          {/* Prev arrow — only in slider mode */}
          {useSlider && (
            <button
              type="button"
              onClick={() => scroll("left")}
              className="absolute -left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-blue shadow-md transition-colors hover:bg-gray-50 sm:flex lg:-left-5"
              aria-label="Previous vehicles"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
          )}

          {loading ? (
            <div className="flex gap-5 overflow-hidden py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[380px] w-[calc(33.333%-14px)] min-w-[260px] shrink-0 animate-pulse rounded-2xl bg-gray-100" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-12 text-center text-gray-500">No vehicles in this category yet.</p>
          ) : useSlider ? (
            /* Slider layout for >3 vehicles */
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filtered.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} slider />
              ))}
            </div>
          ) : (
            /* Grid layout for ≤3 vehicles */
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}

          {/* Next arrow — only in slider mode */}
          {useSlider && !loading && filtered.length > 0 && (
            <button
              type="button"
              onClick={() => scroll("right")}
              className="absolute -right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-blue shadow-md transition-colors hover:bg-gray-50 sm:flex lg:-right-5"
              aria-label="Next vehicles"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-12 rounded-2xl bg-gray-50 px-4 py-8 sm:px-6 sm:py-8 lg:mt-14 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-8">
          <div className="grid flex-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {bottomFeatures.map(({ title, description, icon }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-brand-blue" aria-hidden>
                    {icon}
                  </svg>
                </div>
                <div>
                  <h3 className="font-poppins text-base font-semibold text-gray-900">{title}</h3>
                  <p className="mt-0.5 text-sm text-gray-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/vehicles"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-yellow px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-brand-yellow/90 sm:mt-8 lg:mt-0 lg:w-auto lg:shrink-0"
          >
            View All Vehicles
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
