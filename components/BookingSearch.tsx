'use client';

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      <path
        fillRule="evenodd"
        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function formatDisplayDate(iso: string) {
  if (!iso) return "";
  const date = new Date(iso + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}
function addDays(dateStr: string, n: number) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

const LOCATIONS = [
  "Praslin Domestic Airport",
  "Grand Anse Praslin",
  "Baie Sainte Anne",
  "Côte d'Or",
  "Amitie",
  "Jetty",
  "Other Location",
];

export default function BookingSearch() {
  const router = useRouter();
  const today = todayStr();

  const [pickupDate, setPickupDate] = useState(addDays(today, 1));
  const [dropoffDate, setDropoffDate] = useState(addDays(today, 4));
  const [location, setLocation] = useState("Praslin Domestic Airport");

  const pickupRef = useRef<HTMLInputElement>(null);
  const dropoffRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLSelectElement>(null);

  const handlePickupChange = (val: string) => {
    setPickupDate(val);
    if (val >= dropoffDate) setDropoffDate(addDays(val, 1));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams({ pickupDate, dropoffDate, location });
    router.push(`/vehicles?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl xl:max-w-6xl rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:p-5">
      <form
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-center"
        onSubmit={handleSubmit}
      >
        {/* Pick-up Date */}
        <div className="relative">
          <button
            type="button"
            onClick={() => pickupRef.current?.showPicker()}
            className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-left transition-colors hover:border-brand-blue/30"
          >
            <CalendarIcon className="h-8 w-8 shrink-0 text-brand-blue" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500">Pick-up Date</span>
              <span className="flex items-center gap-3 text-sm font-semibold text-gray-900">
                {formatDisplayDate(pickupDate)}
                <ChevronDownIcon className="h-4 w-4 text-brand-blue" />
              </span>
            </div>
          </button>
          <input
            ref={pickupRef}
            type="date"
            value={pickupDate}
            min={addDays(today, 1)}
            onChange={(e) => handlePickupChange(e.target.value)}
            className="invisible absolute h-0 w-0"
            aria-hidden
            tabIndex={-1}
          />
        </div>

        {/* Drop-off Date */}
        <div className="relative">
          <button
            type="button"
            onClick={() => dropoffRef.current?.showPicker()}
            className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-left transition-colors hover:border-brand-blue/30"
          >
            <CalendarIcon className="h-8 w-8 shrink-0 text-brand-blue" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500">Drop-off Date</span>
              <span className="flex items-center gap-3 text-sm font-semibold text-gray-900">
                {formatDisplayDate(dropoffDate)}
                <ChevronDownIcon className="h-4 w-4 text-brand-blue" />
              </span>
            </div>
          </button>
          <input
            ref={dropoffRef}
            type="date"
            value={dropoffDate}
            min={addDays(pickupDate, 1)}
            onChange={(e) => setDropoffDate(e.target.value)}
            className="invisible absolute h-0 w-0"
            aria-hidden
            tabIndex={-1}
          />
        </div>

        {/* Pick-up Location */}
        <div className="relative">
          <button
            type="button"
            onClick={() => locationRef.current?.focus()}
            className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-left transition-colors hover:border-brand-blue/30"
          >
            <MapPinIcon className="h-8 w-8 shrink-0 text-brand-blue" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-gray-500">Pick-up Location</span>
              <span className="flex items-center gap-3 text-sm font-semibold text-gray-900 truncate">
                {location}
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-brand-blue" />
              </span>
            </div>
          </button>
          <select
            ref={locationRef}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label="Pick-up location"
          >
            {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>

        <button
          type="submit"
          className="min-h-[72px] rounded-lg bg-brand-blue px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-brand-blue/90 sm:min-h-0"
        >
          Search Vehicles
        </button>
      </form>
    </div>
  );
}
