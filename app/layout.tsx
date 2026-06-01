import type { Metadata } from "next";
import {  Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "CC CarHire Praslin | Car Rental in Praslin Island, Seychelles",
    template: "%s | CC CarHire Praslin",
  },
  description:
    "Rent a car in Praslin Island, Seychelles with CC CarHire. Affordable, reliable car hire with free delivery, full insurance & 24/7 support. Explore Anse Lazio, Vallée de Mai & more at your own pace.",
  keywords: [
    "car rental Praslin Island",
    "car hire Praslin Seychelles",
    "rent a car Praslin",
    "Praslin car rental",
    "Seychelles car hire",
    "Praslin Island car hire",
    "CC CarHire Praslin",
    "cheap car rental Praslin",
    "Praslin vehicle rental",
    "Seychelles rent a car",
  ],
  authors: [{ name: "CC CarHire Praslin" }],
  creator: "CC CarHire Praslin",
  metadataBase: new URL("https://www.cccarhirepraslin.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.cccarhirepraslin.com",
    siteName: "CC CarHire Praslin",
    title: "CC CarHire Praslin | Car Rental in Praslin Island, Seychelles",
    description:
      "Rent a car in Praslin Island, Seychelles. Affordable & reliable car hire with free delivery, full insurance & 24/7 support.",
    images: [{ url: "/hero_image.png", width: 1200, height: 630, alt: "CC CarHire Praslin Island Seychelles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CC CarHire Praslin | Car Rental in Praslin Island, Seychelles",
    description: "Rent a car in Praslin Island, Seychelles. Affordable & reliable car hire with free delivery & 24/7 support.",
    images: ["/hero_image.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CarRental",
  name: "CC CarHire Praslin",
  description: "Affordable and reliable car rental in Praslin Island, Seychelles. Serving Anse Lazio, Vallée de Mai, Grand Anse and all of Praslin.",
  url: "https://www.cccarhirepraslin.com",
  telephone: "+2482711073",
  email: "cccarhire22@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Amitie",
    addressLocality: "Praslin",
    addressCountry: "SC",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -4.316,
    longitude: 55.73,
  },
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "€€",
  image: "https://www.cccarhirepraslin.com/hero_image.png",
  sameAs: [],
  areaServed: {
    "@type": "Place",
    name: "Praslin Island, Seychelles",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}