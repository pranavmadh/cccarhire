import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllChauffeurCars } from "@/lib/chauffeur-cars";
import ChauffeurBookingForm from "./ChauffeurBookingForm";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cars = await getAllChauffeurCars();
  const car = cars.find((c) => c.id === id);
  if (!car) return {};
  return {
    title: `Book ${car.name} with Chauffeur | CC Carhire Praslin`,
    description: `Book the ${car.name} chauffeur service in Praslin, Seychelles from €${car.price}/day. Fuel included, professional driver.`,
  };
}

export default async function ChauffeurBookPage({ params }: Props) {
  const { id } = await params;
  const cars = await getAllChauffeurCars();
  const car = cars.find((c) => c.id === id);
  if (!car) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <ChauffeurBookingForm car={car} />
      </main>
      <Footer />
    </>
  );
}
