import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const highlights = [
  "Local & Trusted Company",
  "Affordable & Transparent",
  "Well Maintained Vehicles",
  "Customer Satisfaction First",
];


const team = [
  {
    name: "CC CarHire Team",
    role: "Locally Owned & Operated",
    description:
      "Our dedicated team of local professionals is passionate about making your experience on Praslin Island as seamless and enjoyable as possible.",
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

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Hero */}
        <section className="bg-brand-blue py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-poppins text-sm font-bold uppercase tracking-wider text-brand-yellow">
              Who We Are
            </p>
            <h1 className="font-poppins mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About CC CarHire
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              A locally owned car rental company in Amitie, Praslin — built on
              trust, transparency, and a love for this beautiful island.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              {/* Three-image gallery */}
              <div className="grid grid-cols-2 grid-rows-2 gap-3 lg:gap-4">
                <div className="relative row-span-2 overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src="/cc_aboutus (1).avif"
                    alt="CC CarHire vehicles in Praslin"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src="/cc_aboutus (2).avif"
                    alt="CC CarHire service in Praslin"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src="/cc_aboutus (3).avif"
                    alt="Praslin island scenery"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>

              <div>
                <p className="font-poppins text-sm font-bold uppercase tracking-wider text-brand-blue">
                  Our Story
                  <span className="mt-2 block h-0.5 w-10 rounded-full bg-brand-yellow" />
                </p>
                <h2 className="font-poppins mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Your Trusted Car Rental Partner in Praslin
                </h2>
                <span className="mt-3 block h-0.5 w-12 rounded-full bg-brand-yellow" />

                <p className="mt-6 text-base leading-relaxed text-gray-600">
                  CC CarHire is a locally owned and operated car rental company
                  based in Amitie, Praslin. Our mission is simple — to provide
                  reliable, affordable, and hassle-free car rental services so
                  you can explore Praslin Island at your own pace and comfort.
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  We take pride in our well-maintained vehicles, transparent
                  pricing, and friendly customer service. Whether you&apos;re
                  visiting for leisure or business, we are here to make your
                  journey smooth, safe, and unforgettable.
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  As a local company, we understand Praslin inside and out. From
                  the hidden beaches of Anse Lazio to the lush trails of Vallée
                  de Mai, we want you to discover every corner of this paradise
                  with ease.
                </p>

                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
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


        {/* Mission & Values */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-poppins text-sm font-bold uppercase tracking-wider text-brand-blue">
                What Drives Us
              </p>
              <h2 className="font-poppins mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Mission & Values
              </h2>
              <span className="mx-auto mt-3 block h-0.5 w-12 rounded-full bg-brand-yellow" />
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {[
                {
                  title: "Reliability",
                  description:
                    "Every vehicle in our fleet is regularly serviced and inspected so you can hit the road with complete confidence.",
                },
                {
                  title: "Transparency",
                  description:
                    "No hidden fees, no surprises. The price you see is the price you pay — simple, honest, and fair.",
                },
                {
                  title: "Community",
                  description:
                    "We are proud to be a Seychellois business. Supporting our local community is at the heart of everything we do.",
                },
              ].map(({ title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-sm"
                >
                  <span className="block h-1 w-10 rounded-full bg-brand-yellow" />
                  <h3 className="font-poppins mt-4 text-xl font-bold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
