import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactUs from "@/components/ContactUs";

export const metadata: Metadata = {
  title: "Contact Us | CC Carhire Praslin",
  description: "Get in touch with CC CarHire in Praslin, Seychelles. Call, email or send us a message — we're here 24/7.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}
