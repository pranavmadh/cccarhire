import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Praslin Island Guide — Beaches, Attractions & Car Rental | CC CarHire",
  description:
    "Explore Praslin Island, Seychelles — home to Anse Lazio, Vallée de Mai & Anse Georgette. Discover the best beaches, nature trails and attractions. Rent a car in Praslin to explore at your own pace.",
};

const highlights = [
  { title: "Stunning Beaches", description: "Crystal-clear waters and white sandy beaches." },
  { title: "Scenic Drives", description: "Breathtaking coastal roads and lush landscapes." },
  { title: "Nature & Wildlife", description: "Explore Vallée de Mai and unique tropical wildlife." },
  { title: "Island Experiences", description: "Snorkeling, hiking and island hopping adventures." },
];

const destinations = [
  {
    title: "Anse Lazio",
    description:
      "Consistently ranked among the world's top beaches, Anse Lazio stuns with powdery white sand, giant granite boulders, and crystal-clear turquoise water. Perfect for swimming, snorkeling, and soaking in the natural beauty of Praslin's north coast.",
    distance: "35 km",
    image: "/praslin_island/Anse_Lazio.jpeg",
  },
  {
    title: "Vallée de Mai",
    description:
      "A UNESCO World Heritage Site and one of Seychelles' most iconic landmarks, Vallée de Mai is an ancient palm forest home to the legendary Coco de Mer — the world's largest seed. Walk through primeval trails and spot rare Black Parrots in their natural habitat.",
    distance: "28 km",
    image: "/praslin_island/Vallée_de_Mai.jpg",
  },
  {
    title: "Anse Georgette",
    description:
      "One of Praslin's best-kept secrets, Anse Georgette is a secluded paradise accessible by a scenic coastal trail. With calm turquoise waters, soft white sand, and lush greenery, it's the ideal spot for a peaceful escape away from the crowds.",
    distance: "22 km",
    image: "/praslin_island/Anse_Georgette.jpg",
  },
  {
    title: "Baie Sainte Anne",
    description:
      "The main ferry hub of Praslin, Baie Sainte Anne is a charming fishing village that offers an authentic glimpse into Seychellois island life. Browse the local market, enjoy fresh seafood by the waterfront, and watch traditional pirogues glide across the bay.",
    distance: "18 km",
    image: "/praslin_island/Baie_Sainte_Anne.jpg",
  },
];

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-white" aria-hidden>
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
      </svg>
    </span>
  );
}

function PinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-brand-blue" aria-hidden>
      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .988.55l.078.041.019.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
      <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
      <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
    </svg>
  );
}

export default function PraslinPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">

              {/* Left */}
              <div>
                <h1 className="font-poppins text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Discover Praslin Island
                </h1>
                <p className="mt-5 text-base leading-relaxed text-gray-500">
                  Praslin Island is a tropical paradise in Seychelles, known for its pristine beaches, lush nature and relaxed island atmosphere. Home to the UNESCO World Heritage Site Vallée de Mai and some of the world&apos;s most beautiful beaches, Praslin offers the perfect blend of natural beauty and unforgettable experiences.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
                  {highlights.map(({ title, description }) => (
                    <div key={title} className="flex items-start gap-3">
                      <CheckIcon />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: image — rounded on right side */}
              <div className="relative aspect-4/3 overflow-hidden rounded-tr-3xl rounded-br-3xl rounded-tl-3xl shadow-xl lg:rounded-tl-none">
                <Image
                  src="/praslin_island/island.jpg"
                  alt="Praslin Island beach"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="bg-white pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mb-8">
              <h2 className="font-poppins text-2xl font-bold text-gray-900 sm:text-3xl">
                Popular Destinations
              </h2>
              <span className="mt-2 block h-1 w-10 rounded-full bg-brand-yellow" />
            </div>

            {/* Row 1 & 2: 2 cards per row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {destinations.map(({ title, description, distance, image }) => (
                <div key={title} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                  <div className="relative h-64 sm:h-72">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-poppins text-base font-bold text-brand-blue">{title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{description}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-gray-600">
                      <PinIcon />
                      {distance}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 3: CTA only */}
            <div className="mt-5">
              <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-brand-blue p-8 sm:flex-row sm:gap-10">
                <div>
                  <h3 className="font-poppins text-xl font-bold text-white sm:text-2xl">
                    Ready to Explore Praslin Island?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-200">
                    Book your car today and enjoy the freedom to explore at your own pace.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-center gap-3">
                  <Link
                    href="/vehicles"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-8 py-4 text-base font-bold text-gray-900 transition-colors hover:bg-brand-yellow/90"
                  >
                    <CarIcon />
                    Book Car Now
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-brand-yellow shrink-0" aria-hidden>
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                    </svg>
                    Best Rates &nbsp;•&nbsp; No Hidden Fees &nbsp;•&nbsp; Local Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
