import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllVehicles } from "@/lib/vehicles";
import type { Vehicle } from "@/lib/types/vehicle";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ pickupDate?: string; dropoffDate?: string; location?: string }>;
}

export async function generateStaticParams() {
  const vehicles = await getAllVehicles();
  return vehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vehicles = await getAllVehicles();
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) return {};
  return {
    title: `${vehicle.name} | CC Carhire Praslin`,
    description: `Rent the ${vehicle.name} in Praslin, Seychelles from €${vehicle.price}/day.`,
  };
}

function getDescription(vehicle: Vehicle): string {
  const typeMap: Record<string, string> = {
    suv: "SUV, ideal for exploring Praslin's scenic roads with confidence and comfort",
    hatchback: "hatchback, perfect for getting around Praslin with ease and great fuel efficiency",
    compact: "compact car, great for navigating Praslin's roads while keeping costs low",
  };
  const desc = typeMap[vehicle.category] ?? "vehicle, a great choice for your Praslin adventure";
  return `The ${vehicle.name} is a reliable and well-maintained ${desc}. It features a smooth ${vehicle.transmission.toLowerCase()} drive${vehicle.airConditioning ? ", air conditioning" : ""}${vehicle.features?.length ? ", and " + vehicle.features.slice(0, 3).join(", ").toLowerCase() : ""}. Ideal for families, couples, and solo travellers alike.`;
}

/* ── Icons ── */
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

const specDefs = [
  {
    key: "seats",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-brand-blue" aria-hidden>
        <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM16 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.5 18a4.5 4.5 0 0 1 9 0v.75H5.5V18Z" />
      </svg>
    ),
  },
  {
    key: "doors",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue" aria-hidden>
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>
    ),
  },
  {
    key: "luggage",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue" aria-hidden>
        <path d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v.375h3.375A2.625 2.625 0 0 1 18.75 4.875v13.5A2.625 2.625 0 0 1 16.125 21H7.875A2.625 2.625 0 0 1 5.25 18.375V4.875A2.625 2.625 0 0 1 7.875 2.25H11.25v-.375ZM8.625 7.875a.75.75 0 0 0 0 1.5h6.75a.75.75 0 0 0 0-1.5h-6.75Z" />
      </svg>
    ),
  },
  {
    key: "ac",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-brand-blue" aria-hidden>
        <path strokeLinecap="round" d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
      </svg>
    ),
  },
  {
    key: "transmission",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-brand-blue" aria-hidden>
        <path fillRule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.15 1.199l-1.27 1.27a7.002 7.002 0 0 1 0 2.828l1.27 1.27a1 1 0 0 1 .15 1.199l-1.18 2.044a1 1 0 0 1-1.186.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .15-1.199l1.27-1.27a7.002 7.002 0 0 1 0-2.828l-1.27-1.27a1 1 0 0 1-.15-1.199l1.18-2.044a1 1 0 0 1 1.186-.447l1.598.54A6.993 6.993 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    key: "fuel",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue" aria-hidden>
        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
        <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Z" clipRule="evenodd" />
      </svg>
    ),
  },
];



const footerTrust = [
  {
    label: "Best Price Guarantee",
    sub: "Get the best rates with no hidden charges.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-brand-blue" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    label: "Free Cancellation",
    sub: "Cancel up to 48 hours before pickup.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-brand-blue" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    label: "Secure Booking",
    sub: "Your data is safe with us.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-brand-blue" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    label: "Well Maintained Cars",
    sub: "Safety and comfort guaranteed.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-brand-blue" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    label: "24/7 Customer Support",
    sub: "We're here to help you anytime.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-brand-blue" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V20.25a.75.75 0 0 0 1.28.53l3.58-3.58A48.956 48.956 0 0 0 12 17.25" />
      </svg>
    ),
  },
];

export default async function VehicleDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const vehicles = await getAllVehicles();
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) notFound();

  const bookingParams = new URLSearchParams();
  if (sp.pickupDate) bookingParams.set("pickupDate", sp.pickupDate);
  if (sp.dropoffDate) bookingParams.set("dropoffDate", sp.dropoffDate);
  if (sp.location) bookingParams.set("location", sp.location);
  const bookingQuery = bookingParams.toString() ? `?${bookingParams.toString()}` : "";

  const description = getDescription(vehicle);

  const hasDiscount = vehicle.discountedPrice && vehicle.discountedMinDays;

  const specs = [
    { label: `${vehicle.seats} Seats`, icon: specDefs[0].icon },
    { label: "5 Doors", icon: specDefs[1].icon },
    ...(typeof vehicle.luggage === "number"
      ? [{ label: `${vehicle.luggage} Luggage`, icon: specDefs[2].icon }]
      : []),
    ...(vehicle.airConditioning
      ? [{ label: "Air Conditioning", icon: specDefs[3].icon }]
      : []),
    { label: vehicle.transmission, icon: specDefs[4].icon },
    { label: "Petrol", icon: specDefs[5].icon },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">

        {/* ── Step Progress Bar ── */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              {/* Step 1 — active */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white text-sm font-bold shadow-sm">
                  1
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">Choose Your Vehicle</p>
                  <p className="text-xs text-gray-500">Select your preferred car</p>
                </div>
                <p className="text-xs font-semibold text-gray-900 sm:hidden">Choose Vehicle</p>
              </div>

              {/* Connector */}
              <div className="flex-1 h-px bg-gray-300 max-w-32" />

              {/* Step 2 — inactive */}
              <div className="flex items-center gap-3 shrink-0 opacity-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 text-gray-500 text-sm font-bold">
                  2
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-500 leading-tight">Complete Booking</p>
                  <p className="text-xs text-gray-400">Add extras &amp; make payment</p>
                </div>
                <p className="text-xs font-semibold text-gray-500 sm:hidden">Complete</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">

          {/* Back link */}
          <Link
            href="/#vehicles"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-brand-blue/80 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to all vehicles
          </Link>

          {/* ── Main Two-Column Grid ── */}
          <div className="mt-6 lg:grid lg:grid-cols-[1fr_480px] lg:gap-10 xl:gap-14">

            {/* ── LEFT: Image + Spec Grid ── */}
            <div>
              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl bg-white shadow">
                <div className="relative aspect-4/3">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                  />
                  {/* Transmission badge */}
                  <span className="absolute left-4 top-4 rounded-md bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-gray-800 shadow">
                    {vehicle.transmission}
                  </span>
                  {vehicle.popular && (
                    <span className="absolute right-4 top-4 rounded-md bg-brand-yellow px-3 py-1.5 text-xs font-bold text-gray-900 shadow">
                      Popular
                    </span>
                  )}
                </div>
              </div>

              {/* Specs grid */}
              <div className="mt-5 rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-gray-100">
                  {specs.map(({ label, icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 px-5 py-4"
                    >
                      <span className="shrink-0">{icon}</span>
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust icons row */}
        
            </div>

            {/* ── RIGHT: Details Panel ── */}
            <div className="mt-8 lg:mt-0">

              {/* Name + tags */}
              <div>
                <h1 className="font-poppins text-3xl font-bold text-gray-900 sm:text-4xl">
                  {vehicle.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700">
                    {vehicle.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-brand-blue" aria-hidden>
                      <path fillRule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.15 1.199l-1.27 1.27a7.002 7.002 0 0 1 0 2.828l1.27 1.27a1 1 0 0 1 .15 1.199l-1.18 2.044a1 1 0 0 1-1.186.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .15-1.199l1.27-1.27a7.002 7.002 0 0 1 0-2.828l-1.27-1.27a1 1 0 0 1-.15-1.199l1.18-2.044a1 1 0 0 1 1.186-.447l1.598.54A6.993 6.993 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                    {vehicle.transmission}
                  </span>
                  {vehicle.modelYear && (
                    <span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700">
                      {vehicle.modelYear}
                    </span>
                  )}
                </div>
              </div>

              {/* Vehicle Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div className="mt-7">
                  <h2 className="font-poppins text-base font-semibold text-gray-900">
                    Vehicle Features
                  </h2>
                  <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {vehicle.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckIcon className="h-5 w-5 shrink-0 text-brand-blue" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* About */}
              <div className="mt-7">
                <h2 className="font-poppins text-base font-semibold text-gray-900">
                  About {vehicle.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {description}
                </p>
              </div>

              {/* Pricing + CTA */}
              <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                {/* Regular price */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Price from
                    </p>
                    <p className="font-poppins mt-1 leading-none">
                      <span className="text-4xl font-bold text-gray-900">€{vehicle.price}</span>
                      <span className="ml-1 text-sm text-gray-500">/ day</span>
                    </p>
                  </div>
                  {hasDiscount && (
                    <div className="rounded-lg bg-green-50 border border-green-100 px-3 py-2 text-right">
                      <p className="text-xs font-medium text-green-700">
                        {vehicle.discountedMinDays}+ days
                      </p>
                      <p className="font-poppins text-lg font-bold text-green-700">
                        €{vehicle.discountedPrice}<span className="text-xs font-normal">/day</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Continue Booking button */}
                <Link
                  href={`/vehicles/${id}/book${bookingQuery}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-blue/90"
                >
                  Continue Booking
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>

                {/* Best price guarantee */}
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <ShieldCheckIcon className="h-4 w-4 text-brand-blue" />
                  <p className="text-xs font-medium text-gray-500">Best Price Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer Trust Strip ── */}
        <div className="mt-10 border-t border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {footerTrust.map(({ label, sub, icon }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-brand-blue leading-tight">{label}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
