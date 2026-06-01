import Image from "next/image";
import Link from "next/link";
import { getAllChauffeurCars } from "@/lib/chauffeur-cars";

function SnowflakeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
    </svg>
  );
}

function UsersIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM16 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.5 18a4.5 4.5 0 0 1 9 0v.75H5.5V18Z" />
    </svg>
  );
}

function FuelIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden
    >
      <rect x="5" y="4" width="8" height="16" rx="1" />
      <path strokeLinecap="round" d="M13 8h3l2 4v8h-5V8Z" />
      <path strokeLinecap="round" d="M7 8h4M7 12h4" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
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
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}


export default async function ChauffeurSection() {
  const chauffeurCars = await getAllChauffeurCars();
  return (
    <section
      id="chauffeur"
      className="bg-white py-16 sm:py-20"
      aria-labelledby="chauffeur-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Hero card ── */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <div className="grid lg:grid-cols-2">

            {/* Left: text */}
            <div className="flex flex-col justify-center px-8 py-10 sm:px-10 lg:px-12 lg:py-14">
              <h2
                id="chauffeur-heading"
                className="font-poppins text-4xl font-bold leading-tight text-gray-900 sm:text-5xl"
              >
                Rent a Car
                <br />
                <span className="text-brand-blue">with a chauffeur</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
                Discover the beauty of the island with a dedicated chauffeur for a full
                day of exploration. Travel to your desired locations without the hassle
                of fueling up, as all your fuel needs will be taken care of. Relax and
                enjoy the sights, knowing that your comfort and convenience are our top
                priorities. Let us take you on an unforgettable journey through the
                island&apos;s stunning landscapes and hidden gems.
              </p>

             
            </div>

            {/* Right: hero image */}
            <div className="relative min-h-72 bg-linear-to-br from-blue-800 to-brand-blue lg:min-h-0">
              <Image
                src="/cahuffer_image.png"
                alt="Professional chauffeur opening car door"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* White fade from left */}
              <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent" />
            </div>
          </div>
        </div>

        {/* ── Car cards ── */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {chauffeurCars.map((car) => (
            <article
              key={car.id}
              className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100"
            >
              {/* Car image */}
              <div className="relative aspect-video">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-poppins text-xl font-bold text-gray-900">{car.name}</h3>
                <p className="mt-1 font-poppins text-3xl font-bold text-brand-blue">
                  €{car.price}
                </p>

                {/* Features row */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1.5">
                    <SnowflakeIcon className="h-4 w-4 text-brand-blue" />
                    Air conditioning equipped
                  </span>
                  <span className="hidden h-4 w-px bg-gray-200 sm:block" aria-hidden />
                  <span className="inline-flex items-center gap-1.5">
                    <UsersIcon className="h-4 w-4 text-gray-400" />
                    {car.passengers} passengers
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={`/chauffeur/${car.id}/book`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
                >
                  Book Now
                  <ArrowRightIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
