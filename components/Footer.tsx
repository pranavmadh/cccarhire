'use client';

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcApplePay } from "@fortawesome/free-brands-svg-icons";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Our Vehicles", href: "#vehicles" },
  { label: "Our Services", href: "#services" },
  { label: "Rates", href: "#rates" },
  { label: "Terms & Conditions", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Contact Us", href: "#contact" },
];

const vehicleLinks = ["SUV Cars", "Hatchback Cars", "Compact Cars", "Automatic Cars"];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold tracking-widest text-white uppercase">{children}</h3>
      <div className="mt-2 h-0.5 w-10 bg-yellow-400" />
    </div>
  );
}

function FooterLink({ href, children }: { href?: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href ?? "#"}
        className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-yellow-400"
      >
        <svg className="h-3 w-3 shrink-0 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
        </svg>
        {children}
      </Link>
    </li>
  );
}

function ContactItem({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-400/40 text-yellow-400">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-sm text-gray-300">{detail}</p>
      </div>
    </div>
  );
}

function BadgeItem({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-yellow-400">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero_image.png"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#071126]/90" />
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.6fr]">

          {/* Col 1 — Brand */}
          <div className="space-y-5">
            <Image src="/logo.png" alt="CC CarHire" width={180} height={70} className="object-contain" />
            <p className="font-poppins text-base italic text-yellow-400">Amitie. Praslin</p>
            <p className="max-w-xs text-sm leading-relaxed text-gray-300">
              Your trusted car rental partner in Praslin. Reliable vehicles, affordable prices and excellent service for a smooth and unforgetitable journey.
            </p>
            <div className="h-0.5 w-10 bg-yellow-400" />

            <div className="space-y-4">
              <ContactItem
                title="Visit Us"
                detail="Amitie, Grand-Anse Praslin, Seychelles"
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                  </svg>
                }
              />
              <ContactItem
                title="Call Us"
                detail="+248 271 10 73"
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                }
              />
              <ContactItem
                title="Email Us"
                detail="cccarhire22@gmail.com"
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                }
              />
              <ContactItem
                title="Working Hours"
                detail="Open 24/7 – We're here whenever you need us."
                icon={
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                  </svg>
                }
              />
            </div>

          </div>

          {/* Col 2 — Company */}
          <div>
            <SectionHeading>Company</SectionHeading>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Col 3 — Popular Vehicles */}
          <div>
            <SectionHeading>Popular Vehicles</SectionHeading>
            <ul className="space-y-3">
              {vehicleLinks.map((v) => (
                <FooterLink key={v}>{v}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Col 5 — Newsletter + Badges */}
          <div className="space-y-6">
<div className="space-y-4">
              <BadgeItem
                title="Well Maintained Cars"
                subtitle="Quality vehicles you can trust"
                icon={
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                }
              />
              <BadgeItem
                title="Best Prices"
                subtitle="Affordable prices, no hidden fees"
                icon={
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path fillRule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.121-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
                  </svg>
                }
              />
              <BadgeItem
                title="24/7 Support"
                subtitle="We're here to help you anytime"
                icon={
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clipRule="evenodd" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">

            {/* Copyright */}
            <p className="text-xs text-gray-400">
              © 2024 CC CarHire. All Rights Reserved.{" "}
              <span className="block sm:inline">Made with ❤️ by{" "}
                <a href="https://www.instagram.com/kytolabs/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">kytolabs</a>.
              </span>
            </p>

            {/* Tagline */}
            <div className="flex items-center gap-2 text-yellow-400">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
              </svg>
              <span className="font-poppins text-base font-medium italic">
                Explore Praslin{" "}
                <span className="font-bold not-italic">Your Way</span>
              </span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
              </svg>
            </div>

            
          </div>
        </div>
      </div>
    </footer>
  );
}
