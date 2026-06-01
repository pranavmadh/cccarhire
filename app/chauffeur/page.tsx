import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllChauffeurCars } from "@/lib/chauffeur-cars";

export const metadata: Metadata = {
  title: "Chauffeur Service | CC Carhire Praslin",
  description:
    "Explore Praslin Island in comfort with our professional chauffeur service. Full day tours with fuel included — sit back and enjoy the sights.",
};

function SnowflakeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden
    >
      <path strokeLinecap="round" d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM16 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.5 18a4.5 4.5 0 0 1 9 0v.75H5.5V18Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.954l-1.293 1.293a13.044 13.044 0 0 0 6.586 6.586l1.293-1.293a1.875 1.875 0 0 1 1.954-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}


export default async function ChauffeurPage() {
  const chauffeurCars = await getAllChauffeurCars();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">

        {/* Page header */}
        <div className="relative overflow-hidden bg-white border-b border-gray-100">
          {/* Background image with fade on right — desktop only */}
          <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <Image
              src="/cahuffer_image.png"
              alt="Professional chauffeur"
              fill
              className="object-cover object-center"
              sizes="50vw"
              priority
            />
            {/* Fade from white on the left */}
            <div className="absolute inset-y-0 left-0 w-2/3 bg-linear-to-r from-white to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
            <div className="max-w-xl">
              <p className="font-poppins text-sm font-bold uppercase tracking-wider text-brand-blue">
                Chauffeur Service
                <span className="mt-2 block h-0.5 w-10 rounded-full bg-brand-yellow" />
              </p>
              <h1 className="font-poppins mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Rent a Car with a Chauffeur
              </h1>
              <p className="mt-4 text-base text-gray-600 sm:text-lg leading-relaxed">
                Discover the beauty of the island with a dedicated chauffeur for a full day
                of exploration. Travel to your desired locations without the hassle of fueling
                up, as all your fuel needs will be taken care of. Relax and enjoy the sights,
                knowing that your comfort and convenience are our top priorities. Let us take
                you on an unforgettable journey through the island&apos;s stunning landscapes
                and hidden gems.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="tel:+2482711073"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
                >
                  <PhoneIcon />
                  Book by Phone
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-blue px-6 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue/5"
                >
                  Send an Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Car cards */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-poppins text-xl font-bold text-gray-900 mb-6">
            Available Vehicles
            <span className="ml-2 rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-sm font-medium text-brand-blue">
              {chauffeurCars.length}
            </span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chauffeurCars.map((car) => (
              <article
                key={car.id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100"
              >
                <div className="relative aspect-4/3">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-brand-blue px-2.5 py-1 text-xs font-bold text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                    </svg>
                    With Chauffeur
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-poppins text-xl font-bold text-gray-900">{car.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Full Day Tour · Fuel Included</p>

                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-brand-blue"><SnowflakeIcon /></span>
                      Air conditioning equipped
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-gray-500"><UsersIcon /></span>
                      {car.passengers} passengers
                    </div>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-3 border-t border-gray-100 pt-5">
                    <div>
                      <span className="text-xs text-gray-500">From</span>
                      <p className="font-poppins leading-none mt-0.5">
                        <span className="text-3xl font-bold text-brand-blue">€{car.price}</span>
                        <span className="text-sm text-gray-500">/day</span>
                      </p>
                    </div>
                    <Link
                      href={`/chauffeur/${car.id}/book`}
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
                    >
                      Book Now
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                        <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-2xl bg-brand-blue px-6 py-10 sm:px-8 sm:py-12 text-center">
            <h2 className="font-poppins text-2xl font-bold text-white sm:text-3xl">
              Ready to Explore Praslin?
            </h2>
            <p className="mt-3 text-brand-blue/80 text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
              Contact us to arrange your chauffeur-driven tour. We&apos;ll take care of everything.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="tel:+2482711073"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-yellow px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-brand-yellow/90"
              >
                <PhoneIcon />
                +248 271 10 73
              </Link>
              <Link
                href="/#contactus"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                Send an Enquiry
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
