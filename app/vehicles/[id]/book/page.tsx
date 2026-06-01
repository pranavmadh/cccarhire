import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllVehicles } from "@/lib/vehicles";
import BookingForm from "./BookingForm";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vehicles = await getAllVehicles();
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) return {};
  return {
    title: `Book ${vehicle.name} | CC Carhire Praslin`,
  };
}

export default async function BookPage({ params }: Props) {
  const { id } = await params;
  const vehicles = await getAllVehicles();
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-2xl m-8" />}>
          <BookingForm vehicle={vehicle} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
