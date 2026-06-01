import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Vehicles from "@/components/Vehicles";
import ChauffeurSection from "@/components/ChauffeurSection";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";

function ReviewsSkeleton() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-72 animate-pulse rounded bg-gray-200" />
          <div className="h-24 w-64 animate-pulse rounded-2xl bg-gray-200" />
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-52 animate-pulse rounded-2xl bg-gray-200" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Services />
        <Vehicles />
        <ChauffeurSection />
        <Suspense fallback={<ReviewsSkeleton />}>
          <Reviews />
        </Suspense>
        <FAQ />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}
