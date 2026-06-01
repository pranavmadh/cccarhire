import Image from "next/image";
import Link from "next/link";
import BookingSearch from "./BookingSearch";

function ArrowRightIcon({ className }: { className?: string }) {
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

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative overflow-hidden lg:min-h-[540px] ">
        <Image
          src="/hero_image.png"
          alt="Car on a scenic coastal road in Praslin"
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50 md:bg-transparent md:bg-linear-to-r md:from-black/30 md:via-black/10 md:to-black/0" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center px-4 pb-40 pt-16 text-center sm:items-start sm:px-6 sm:pb-48 sm:pt-24 sm:text-left lg:px-20 lg:pb-52 lg:pt-28">
          <div className="max-w-xl">
            <h1 className="font-poppins text-5xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Explore Praslin
              <br />
              Your Way
            </h1>
            <p className="mt-4 text-lg text-white/90 sm:text-2xl">
              Reliable cars. Local service. <br />Unforgettable journeys.
            </p>
            <Link
              href="/vehicles"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-yellow px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-brand-yellow/90"
            >
              Book Your Car
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-24 max-w-7xl px-4 sm:-mt-38 sm:px-6 lg:px-3 flex justify-center">
        <BookingSearch />
      </div>
    </section>
  );
}
