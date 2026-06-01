import Image from "next/image";

const highlights = [
  "Local & Trusted Company",
  "Affordable & Transparent",
  "Well Maintained Vehicles",
  "Customer Satisfaction First",
];

const stats = [
  {
    value: "500+",
    label: "Happy Customers",
    icon: (
      <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM16 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.5 18a4.5 4.5 0 0 1 9 0v.75H5.5V18Z" />
    ),
  },
  {
    value: "100+",
    label: "Quality Vehicles",
    icon: (
      <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0ZM8.25 3.375A2.625 2.625 0 1 1 5.625 6h12.75A2.625 2.625 0 1 1 15.75 3.375H8.25ZM4.875 20.25a.75.75 0 0 0 0 1.5h14.25a.75.75 0 0 0 0-1.5H4.875Z" />
    ),
  },
  {
    value: "24/7",
    label: "Customer Support",
    icon: (
      <path d="M5 11a7 7 0 0 1 14 0v2a3 3 0 0 1-3 3h-1l-2 3v-3H8a3 3 0 0 1-3-3v-2Z" />
    ),
  },
  {
    value: "100%",
    label: "Fully Insured",
    icon: (
      <path
        fillRule="evenodd"
        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516 11.209 11.209 0 0 1-7.877-3.08ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        clipRule="evenodd"
      />
    ),
  },
];

function CheckIcon({ className }: { className?: string }) {
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
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function AboutUs() {
  return (
    <section
      id="aboutus"
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg lg:aspect-[5/4]">
            <Image
              src="/cc_aboutus (1).avif"
              alt="CC CarHire team and vehicles in Praslin"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="text-center lg:text-left">
            <p className="font-poppins text-md font-bold uppercase tracking-wider text-brand-blue">
              About Us
              <span className="mt-2 mx-auto block h-0.5 w-10 rounded-full bg-brand-yellow lg:mx-0" />
            </p>
            <h2
              id="about-heading"
              className="font-poppins mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Your Trusted Car Rental Partner in Praslin
            </h2>
            <span className="mt-3 mx-auto block h-0.5 w-12 rounded-full bg-brand-yellow lg:mx-0" />

            <p className="mt-6 text-base leading-relaxed text-gray-600">
              CC CarHire is a locally owned and operated car rental company based
              in Amitie, Praslin. Our mission is simple – to provide reliable,
              affordable, and hassle-free car rental services so you can explore
              Praslin Island at your own pace and comfort.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              We take pride in our well-maintained vehicles, transparent pricing,
              and friendly customer service. Whether you&apos;re visiting for
              leisure or business, we are here to make your journey smooth, safe,
              and unforgettable.
            </p>

            {/* Mobile: tags */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 lg:hidden">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 text-sm font-medium text-brand-blue"
                >
                  {item}
                </span>
              ))}
            </div>
            {/* Desktop: checklist */}
            <ul className="mt-8 hidden grid-cols-2 gap-4 lg:grid">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue">
                    <CheckIcon className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

       
      </div>
    </section>
  );
}
