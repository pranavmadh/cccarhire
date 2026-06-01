import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Transfer Services | CC Carhire Praslin",
  description:
    "Convenient airport and jetty transfers across Praslin Island. Meet & Greet service, luggage assistance, and reliable transfers to any hotel or destination.",
};


const whyUs = [
  {
    title: "Affordable Prices",
    desc: "Competitive rates with no hidden fees.",
    icon: "M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z",
  },
  {
    title: "On-Time Service",
    desc: "We value your time and ensure punctual pickups and drop-offs.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    title: "Comfortable Vehicles",
    desc: "Modern, clean and air-conditioned vehicles for a relaxing ride.",
    icon: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
  },
  {
    title: "Any Destination",
    desc: "Transfers to any hotel or location across the island.",
    icon: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
  },
  {
    title: "Customer Support",
    desc: "We're here to help you anytime during your journey.",
    icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V20.25a.75.75 0 0 0 1.28.53l3.58-3.58",
  },
];

export default function TransferPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-white">

          {/* Image — right half, full bleed, desktop only */}
          <div className="absolute inset-y-0 right-0 hidden w-3/5 lg:block">
            <Image
              src="/Transfer_Service.png"
              alt="Transfer service vehicle"
              fill
              className="object-cover object-center"
              priority
              sizes="60vw"
            />
            {/* Left fade into white */}
            <div className="absolute inset-y-0 left-0 w-48 bg-linear-to-r from-white to-transparent" />
            
          </div>

          {/* Content */}
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-6 sm:py-8 lg:py-12 lg:w-1/2 lg:pr-16 text-center lg:text-left">
              <h1 className="font-poppins text-5xl font-extrabold leading-tight text-gray-900 sm:text-6xl">
                Transfer
                <br />
                <span className="text-brand-blue">Services</span>
              </h1>
              <div className="mt-3 h-1 w-14 rounded-full bg-brand-yellow mx-auto lg:mx-0" />
              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                Welcome to our transfer service! We offer convenient transfers
                to any desired location from the airport or jetty to your hotel,
                all at affordable prices. Experience hassle-free travel with our
                reliable service that prioritises your comfort and satisfaction.
                Let us take care of your transportation needs so you can focus
                on enjoying your trip!
              </p>
              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                We will meet you at the airport/jetty! Our prices vary based on
                your chosen location, ensuring you get the best value for
                your transfer. Trust us to provide a smooth and convenient
                journey from the airport to your destination.
                Your satisfaction is our priority!
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
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
                <Link
                  href="tel:+2482711073"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-brand-yellow/90 shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.954l-1.293 1.293a13.044 13.044 0 0 0 6.586 6.586l1.293-1.293a1.875 1.875 0 0 1 1.954-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  +248 271 10 73
                </Link>
              </div>

              {/* Mobile image */}
              <div className="mt-10 overflow-hidden rounded-2xl shadow-xl lg:hidden">
                <Image
                  src="/Transfer_Service.png"
                  alt="Transfer service vehicle"
                  width={700}
                  height={400}
                  className="h-64 w-full object-cover sm:h-80"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="bg-gray-50 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-poppins text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Choose Our Transfer Service?
              </h2>
              <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand-yellow" />
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {whyUs.map(({ title, desc, icon }) => (
                <div
                  key={title}
                  className="group relative flex flex-col items-center rounded-2xl bg-white px-5 py-8 text-center shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md"
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-b-full bg-brand-yellow" />

                  {/* Icon circle */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/8 group-hover:bg-brand-blue/12 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-7 w-7 text-brand-blue"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                  </div>

                  <p className="font-poppins mt-5 text-base font-extrabold text-gray-900">{title}</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-brand-blue py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <h2 className="font-poppins text-3xl font-bold text-white sm:text-4xl">
              Ready to Book Your Transfer?
            </h2>
            <p className="mt-4 text-base text-blue-100">
              Contact us via WhatsApp or phone and we will arrange your transfer at the best price.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="https://wa.me/2482796837?text=Hi%2C%20I%20want%20to%20book%20a%20transfer%20service"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-8 py-4 text-base font-semibold text-brand-blue shadow-sm transition-colors hover:bg-gray-50"
              >
                Book Now
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="tel:+2482711073"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-8 py-4 text-base font-bold text-gray-900 shadow-sm transition-colors hover:bg-brand-yellow/90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.954l-1.293 1.293a13.044 13.044 0 0 0 6.586 6.586l1.293-1.293a1.875 1.875 0 0 1 1.954-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                +248 271 10 73
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
