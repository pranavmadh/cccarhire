'use client';

import { useState } from "react";

const inputCls = "rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 w-full";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          date: date || "Not specified",
          message,
          _subject: `New Enquiry from ${name} — CC CarHire`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setDate(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contactus"
      className="bg-white py-16 sm:py-20"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-poppins text-md font-bold uppercase tracking-wider text-brand-blue">
            Contact Us
            <span className="mx-auto mt-2 block h-0.5 w-10 rounded-full bg-brand-yellow" />
          </p>
          <h2
            id="contact-heading"
            className="font-poppins mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            We&apos;re Here to Help You
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500 sm:text-lg">
            Have a question or need help with your booking? Get in touch with us
            and our team will be happy to assist you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <aside className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100 sm:p-8">
            <h3 className="font-poppins text-3xl font-semibold text-brand-blue">
              Get in Touch
            </h3>
            <span className="mt-3 block h-0.5 w-10 rounded-full bg-brand-yellow" />
            <p className="mt-4 text-sm text-gray-600">
              We&apos;re always ready to help you with your car rental needs.
            </p>

            <div className="mt-6 space-y-5">
              <div className="border-b border-gray-200 pb-4">
                <p className="font-semibold text-gray-900">Visit Us</p>
                <p className="mt-1 text-gray-600">Amitie, Grand-Anse Praslin, Seychelles</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <p className="font-semibold text-gray-900">Call Us</p>
                <p className="mt-1 text-gray-600">+248 271 10 73</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <p className="font-semibold text-gray-900">Email Us</p>
                <p className="mt-1 text-gray-600">cccarhire22@gmail.com</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Working Hours</p>
                <p className="mt-1 text-gray-600">Open 24/7 - We&apos;re here whenever you need us.</p>
              </div>
            </div>
          </aside>

          <div className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100 sm:p-8">
            <h3 className="font-poppins text-3xl font-semibold text-brand-blue">
              Send Us a Message
            </h3>
            <span className="mt-3 block h-0.5 w-10 rounded-full bg-brand-yellow" />

            {status === "success" ? (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mx-auto h-12 w-12 text-green-500" aria-hidden>
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
                <h4 className="font-poppins mt-4 text-lg font-bold text-gray-900">Message Sent!</h4>
                <p className="mt-2 text-sm text-gray-600">Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-5 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputCls}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputCls}
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className={inputCls}
                />
                {status === "error" && (
                  <p className="sm:col-span-2 text-sm text-red-500">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="sm:col-span-2 inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-blue/90 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send Inquiry"}
                </button>
              </form>
            )}

            <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-gray-200">
              <iframe
                title="CC CarHire Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=55.67%2C-4.36%2C55.75%2C-4.27&layer=mapnik&marker=-4.316%2C55.73"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
