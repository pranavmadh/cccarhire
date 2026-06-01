'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/chauffeur", label: "Chauffeur" },
  { href: "/praslin", label: "Praslin Island" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.954l-1.293 1.293a13.044 13.044 0 0 0 6.586 6.586l1.293-1.293a1.875 1.875 0 0 1 1.954-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    return pathname === href;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <nav
        className="mx-auto flex h-32 items-center justify-between px-4 sm:px-6 lg:px-10 max-w-7xl"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="transition-opacity hover:opacity-80 flex-shrink-0"
          onClick={closeMenu}
        >
          <Image
            src="/logo.png"
            alt="CC Carhire Amitie Praslin"
            width={180}
            height={64}
            priority
            className="h-16 w-auto sm:h-24"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`relative pb-1 text-md font-medium transition-colors ${
                  isActive(href)
                    ? "font-semibold text-brand-blue"
                    : "text-black hover:text-brand-blue"
                }`}
                onClick={closeMenu}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-brand-yellow" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="https://wa.me/2482796837"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#25d366]/90"
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp
          </Link>
          <Link
            href="tel:+2482711073"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-yellow px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-brand-yellow/90"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            +248 271 10 73
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-yellow"
          aria-label={menuOpen ? "Close main menu" : "Open main menu"}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <CloseIcon className="h-7 w-7 text-brand-blue" />
          ) : (
            <MenuIcon className="h-7 w-7 text-brand-blue" />
          )}
        </button>
      </nav>
      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={menuOpen ? "false" : "true"}
        onClick={closeMenu}
      />
      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex items-center justify-between px-4 h-20 border-b border-gray-100">
          <Link
            href="/"
            className="transition-opacity hover:opacity-80 flex-shrink-0"
            onClick={closeMenu}
          >
            <Image
              src="/logo.png"
              alt="CC Carhire Amitie Praslin"
              width={140}
              height={48}
              priority
              className="h-12 w-auto"
            />
          </Link>
          <button
            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-yellow"
            aria-label="Close menu"
            onClick={closeMenu}
            type="button"
          >
            <CloseIcon className="h-7 w-7 text-brand-blue" />
          </button>
        </div>
        <ul className="flex flex-col gap-2 mt-6 px-4">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={closeMenu}
                className={`block py-3 px-2 rounded-md text-md font-medium ${
                  isActive(href)
                    ? "font-semibold text-brand-blue bg-brand-yellow/20"
                    : "text-black hover:text-brand-blue hover:bg-brand-yellow/10"
                } transition-colors`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-4 mt-6 flex flex-col gap-3">
          <Link
            href="https://wa.me/2482796837"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#25d366] px-4 py-2.5 text-md font-semibold text-white transition-colors hover:bg-[#25d366]/90"
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp
          </Link>
          <Link
            href="tel:+2482711073"
            onClick={closeMenu}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-yellow px-4 py-2.5 text-md font-semibold text-black transition-colors hover:bg-brand-yellow/90"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            +248 271 10 73
          </Link>
        </div>
      </div>
    </header>
  );
}
