import Image from "next/image";
import Link from "next/link";

const features = [
  { label: "Airport & Jetty Pickups" },
  { label: "Meet & Greet Service" },
  { label: "Any Hotel or Destination" },
  { label: "Affordable Flat Rates" },
  { label: "Air-Conditioned Vehicles" },
  { label: "On-Time Guaranteed" },
];

export default function TransferSection() {
  return (
    <section id="transfer" className="relative overflow-hidden bg-gray-50" aria-labelledby="transfer-heading">
      <div className="grid lg:grid-cols-2 min-h-[500px] lg:min-h-[560px]">

        {/* Left: full-bleed image */}
        <div className="relative min-h-72 sm:min-h-96 lg:min-h-0">
          <Image
            src="/Transfer_Service.png"
            alt="Transfer service vehicle"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Right fade into section bg on desktop */}
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-gray-50 to-transparent hidden lg:block" />
          {/* Bottom fade on mobile */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-gray-50 to-transparent lg:hidden" />
        </div>

        {/* Right: content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left justify-center px-8 py-12 sm:px-12 lg:pl-16 lg:pr-40 lg:py-20">
          <p className="font-poppins text-md font-bold uppercase tracking-wider text-brand-blue">
            Transfer Services
            <span className="mt-2 block h-0.5 w-10 rounded-full bg-brand-yellow mx-auto lg:mx-0" />
          </p>
          <h2
            id="transfer-heading"
            className="font-poppins mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl"
          >
            Our <span className="text-brand-blue">Transfer Service</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-gray-500 sm:text-lg">
            We offer convenient, affordable transfers from the airport or jetty
            to any hotel or location across Praslin Island. Sit back and relax —
            we will take care of everything.
          </p>

          {/* Feature pills */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {features.map(({ label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue/8 px-4 py-2 text-sm font-semibold text-brand-blue"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden>
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
                {label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/transfer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-brand-yellow/90 shadow-sm"
            >
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="https://wa.me/2482796837?text=Hi%2C%20I%20want%20to%20book%20a%20transfer%20service"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90 shadow-sm"
            >
              Book Now
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
