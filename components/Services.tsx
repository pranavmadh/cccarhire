import Image from "next/image";
import type { ReactNode } from "react";

const benefits = [
  {
    number: "01",
    title: "No Deposit",
    description:
      "Rent your car hassle free with no upfront security deposit.",
    icon: (
      <>
        <rect x="4" y="8" width="16" height="11" rx="2" />
        <path d="M4 11h16M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <circle cx="12" cy="15" r="1.5" fill="currentColor" className="text-brand-yellow" />
      </>
    ),
  },
  {
    number: "02",
    title: "Full Insurance",
    description:
      "Drive with peace of mind. Maximum excess of €1000 (reducible).",
    icon: (
      <>
        <path d="M12 3 4 7v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    number: "03",
    title: "Unlimited Mileage",
    description:
      "Drive unlimited miles within the rental period without extra charges.",
    icon: (
      <>
        <path d="M4 12h16" />
        <path d="M7 9v6M12 9v6M17 9v6" />
        <path d="M4 15h16" strokeDasharray="2 2" />
      </>
    ),
  },
  {
    number: "04",
    title: "Safe Payment",
    description: "Pay easily upon arrival by cash or card.",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M3 11h18" />
        <rect x="14" y="14" width="5" height="4" rx="1" />
        <path d="M15.5 15.5v1M17.5 15.5v1" />
      </>
    ),
  },
  {
    number: "05",
    title: "Free Second Driver",
    description: "Add another driver at no extra cost.",
    icon: (
      <>
        <circle cx="9" cy="8" r="2.5" />
        <path d="M5 18v-1a4 4 0 0 1 4-4h0" />
        <circle cx="16" cy="8" r="2.5" />
        <path d="M12 18v-1a4 4 0 0 1 4-4h0" />
      </>
    ),
  },
  {
    number: "06",
    title: "Free Delivery / Collection",
    description:
      "We deliver and collect the car anywhere on Praslin Island.",
    icon: (
      <>
        <path d="M5 14h14l-1.5-5H6.5L5 14Z" />
        <circle cx="8" cy="17" r="1.5" />
        <circle cx="16" cy="17" r="1.5" />
        <path d="M12 5v3" />
        <path d="M9.5 6.5 12 5l2.5 1.5" />
        <circle cx="18" cy="6" r="2.5" />
        <path d="M18 8.5V11" />
      </>
    ),
  },
  {
    number: "07",
    title: "Baby Car Seat and Booster",
    description: "Baby car seats and boosters available for only €10.",
    icon: (
      <>
        <path d="M8 10h8l-1-4H9l-1 4Z" />
        <path d="M7 10v8h10v-8" />
        <path d="M10 14h4" />
        <circle cx="12" cy="8" r="1" fill="currentColor" className="text-brand-yellow" />
      </>
    ),
  },
  {
    number: "08",
    title: "24/7 Customer Service",
    description: "Receive support anytime during your rental period.",
    icon: (
      <>
        <path d="M5 11a7 7 0 0 1 14 0v2a3 3 0 0 1-3 3h-1l-2 3v-3H8a3 3 0 0 1-3-3v-2Z" />
        <path d="M9 14h6" />
      </>
    ),
  },
  {
    number: "09",
    title: "Same-to-Same Fuel",
    description: "Return the vehicle with the same fuel level provided.",
    icon: (
      <>
        <rect x="5" y="4" width="8" height="16" rx="1" />
        <path d="M13 8h3l2 4v8h-5V8Z" />
        <path d="M7 8h4M7 12h4" />
      </>
    ),
  },
];

function BenefitIcon({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 sm:h-[72px] sm:w-[72px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-8 w-8 text-brand-blue sm:h-9 sm:w-9"
        aria-hidden
      >
        {children}
      </svg>
    </div>
  );
}

function BenefitCard({
  number,
  title,
  description,
  icon,
}: (typeof benefits)[number]) {
  return (
    <article className="flex gap-4 rounded-xl bg-white p-5 shadow-lg sm:gap-5 sm:p-6">
      <BenefitIcon>{icon}</BenefitIcon>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-brand-yellow px-2 py-0.5 font-poppins text-xs font-bold text-gray-900 sm:text-sm">
            {number}
          </span>
          <h3 className="font-poppins text-sm font-bold uppercase tracking-wide text-brand-blue sm:text-base">
            {title}
          </h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-poppins text-md font-bold uppercase tracking-wider text-brand-blue">
            Our Services
            <span className="mx-auto mt-2 block h-0.5 w-10 rounded-full bg-brand-yellow" />
          </p>
          <h2
            id="services-heading"
            className="font-poppins mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Premium Services for <br />a Smooth Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 sm:text-lg">
            At CC CarHire, we go beyond car rentals. We offer a range of services
            designed to make your trip in Praslin comfortable and unforgettable.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl lg:mt-14">
          <Image
            src="/hero_image.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" aria-hidden />

          <div className="relative px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {benefits.map((benefit) => (
                <BenefitCard key={benefit.number} {...benefit} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
