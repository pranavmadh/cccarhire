'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COUNTRY_CODES } from '@/lib/country-codes';
import type { ChauffeurCar } from '@/lib/types/chauffeur-car';

const LOCATIONS = [
  "Praslin Domestic Airport",
  "Côte d'Or",
  "Grand Anse Praslin",
  "Baie Sainte Anne",
  "La Réserve Hotel",
  "Lemuria Resort",
  "Other Location",
];

function todayStr() {
  return new Date().toISOString().split('T')[0];
}
function addDays(dateStr: string, n: number) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}
function diffDays(from: string, to: string) {
  const a = new Date(from + 'T00:00:00').getTime();
  const b = new Date(to + 'T00:00:00').getTime();
  return Math.max(1, Math.round((b - a) / 86400000));
}
function fmtDate(dateStr: string) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch { return dateStr; }
}
function fmt2(n: number) { return n.toFixed(2); }

interface Props { car: ChauffeurCar }

export default function ChauffeurBookingForm({ car }: Props) {
  const today = todayStr();

  const [pickupLoc, setPickupLoc] = useState('Praslin Domestic Airport');
  const [startDate, setStartDate] = useState(addDays(today, 7));
  const [endDate, setEndDate] = useState(addDays(today, 8));
  const [startTime, setStartTime] = useState('08:00');

  const [babySeat, setBabySeat] = useState(0);
  const [childBooster, setChildBooster] = useState(0);
  const [addDriver, setAddDriver] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneDial, setPhoneDial] = useState('+248');
  const [whatsapp, setWhatsapp] = useState('');
  const [whatsappDial, setWhatsappDial] = useState('+248');

  const [payment, setPayment] = useState<'arrival' | 'card'>('arrival');
  const [agreed, setAgreed] = useState(false);

  const duration = useMemo(() => diffDays(startDate, endDate), [startDate, endDate]);
  const subtotal = car.price * duration;
  const extrasTotal = babySeat * 5 + childBooster * 5;
  const total = subtotal + extrasTotal;
  const cardSurcharge = payment === 'card' ? Math.round(total * 0.03 * 100) / 100 : 0;
  const outstanding = Math.round((total + cardSurcharge) * 100) / 100;

  const inputCls = 'w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition';
  const selectCls = inputCls + ' cursor-pointer';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { alert('Please agree to the Terms & Conditions.'); return; }

    const paymentLabel = payment === 'arrival' ? 'Cash on Arrival' : 'Card on Arrival';
    const extraLines: string[] = [];
    if (babySeat > 0) extraLines.push(`  • Baby Seat x${babySeat}: €${fmt2(babySeat * 5)}`);
    if (childBooster > 0) extraLines.push(`  • Child Booster x${childBooster}: €${fmt2(childBooster * 5)}`);
    if (addDriver) extraLines.push(`  • Second Driver: Free`);
    if (extraLines.length === 0) extraLines.push('  None');

    const lines = [
      `🚘 *Chauffeur Booking Request — ${car.name}*`,
      ``,
      `📅 *Tour Details*`,
      `  • Duration: ${duration} ${duration === 1 ? 'day' : 'days'}`,
      `  • Rate: €${car.price}/day`,
      `  • Sub Total: €${fmt2(subtotal)}`,
      ``,
      `📍 *Pickup*`,
      `  • Location: ${pickupLoc}`,
      `  • Start Date: ${fmtDate(startDate)}, ${startTime}`,
      `  • End Date: ${fmtDate(endDate)}`,
      ``,
      `✅ *Included*`,
      `  • Professional Chauffeur`,
      `  • Fuel Costs Covered`,
      `  • Air Conditioning`,
      `  • ${car.passengers} Passengers`,
      ``,
      `🎒 *Extras*`,
      ...extraLines,
      ``,
      `💰 *Total: €${fmt2(outstanding)}*`,
      ...(payment === 'card' ? [`  (incl. 3% card surcharge: €${fmt2(cardSurcharge)})`] : []),
      ``,
      `👤 *Customer Details*`,
      `  • Name: ${fullName || '—'}`,
      `  • Email: ${email || '—'}`,
      `  • Phone: ${phoneDial} ${phone || '—'}`,
      ...(whatsapp ? [`  • WhatsApp: ${whatsappDial} ${whatsapp}`] : []),
      ``,
      `💳 *Payment Method:* ${paymentLabel}`,
    ];

    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/2482796837?text=${message}`, '_blank');
  };

  return (
    <div>
      {/* Progress stepper */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-gray-900 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 leading-tight">Choose Your Vehicle</p>
                <p className="text-xs text-gray-400">{car.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-1 max-w-28">
              <div className="flex-1 h-px bg-gray-300" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gray-400 shrink-0" aria-hidden>
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white text-sm font-bold shadow-sm">2</div>
              <div>
                <p className="font-poppins text-sm font-bold text-brand-blue leading-tight">Complete Booking</p>
                <p className="text-xs text-gray-500">Add details &amp; confirm</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8 xl:grid-cols-[1fr_400px]">

          {/* LEFT */}
          <div className="space-y-4 sm:space-y-6">

            {/* Section 1: Tour Dates & Location */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-poppins flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue shrink-0" aria-hidden>
                  <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 1 0-16 0c0 3.63 1.556 6.326 3.5 8.327a19.583 19.583 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.144.742ZM11.5 13.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd" />
                </svg>
                1. Tour Dates &amp; Pickup Location
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Pickup Location</label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-blue hidden sm:block" aria-hidden>
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .988.55l.078.041.019.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                    </svg>
                    <select value={pickupLoc} onChange={(e) => setPickupLoc(e.target.value)} className={selectCls + ' sm:pl-9'}>
                      {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Start Date</label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-blue hidden sm:block" aria-hidden>
                      <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                    </svg>
                    <input
                      type="date"
                      value={startDate}
                      min={addDays(today, 1)}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        if (e.target.value >= endDate) setEndDate(addDays(e.target.value, 1));
                      }}
                      className={inputCls + ' sm:pl-9'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Pickup Time</label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-blue hidden sm:block" aria-hidden>
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                    </svg>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputCls + ' sm:pl-9'} />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">End Date</label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-blue hidden sm:block" aria-hidden>
                      <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                    </svg>
                    <input
                      type="date"
                      value={endDate}
                      min={addDays(startDate, 1)}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={inputCls + ' sm:pl-9'}
                    />
                  </div>
                </div>
              </div>

              {/* Included banner */}
              <div className="mt-3 rounded-xl bg-brand-blue/5 border border-brand-blue/10 px-3 py-3">
                <p className="text-xs font-semibold text-brand-blue mb-2">Included with every chauffeur booking:</p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-gray-600">
                  {["Professional Chauffeur", "Fuel Costs Covered", "Air Conditioning", "Full Day Tour"].map((item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-brand-blue" aria-hidden><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Extras */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-poppins flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue shrink-0" aria-hidden>
                  <path d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v.375h3.375A2.625 2.625 0 0 1 18.75 4.875v13.5A2.625 2.625 0 0 1 16.125 21H7.875A2.625 2.625 0 0 1 5.25 18.375V4.875A2.625 2.625 0 0 1 7.875 2.25H11.25v-.375ZM8.625 7.875a.75.75 0 0 0 0 1.5h6.75a.75.75 0 0 0 0-1.5h-6.75Z" />
                </svg>
                2. Extras &amp; Add-ons
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

                {/* Baby Seat */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-brand-blue/8">
                      <Image src="/Baby_Seat.png" alt="Baby Seat" fill className="object-cover" sizes="56px" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Baby Seat</p>
                      <p className="mt-0.5 text-xs text-gray-400">0 – 4 yrs</p>
                      <p className="mt-1.5 text-sm font-bold text-brand-blue">€5.00 / Trip</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between rounded-xl border border-gray-200 p-1">
                    <button type="button" onClick={() => setBabySeat(Math.max(0, babySeat - 1))} className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">−</button>
                    <span className="text-sm font-bold text-gray-900">{babySeat}</span>
                    <button type="button" onClick={() => setBabySeat(Math.min(3, babySeat + 1))} className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue text-xl font-bold text-white hover:bg-brand-blue/90 transition-colors">+</button>
                  </div>
                </div>

                {/* Child Booster */}
                <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-brand-blue/8">
                      <Image src="/Child_Booster_Seat.png" alt="Child Booster Seat" fill className="object-cover" sizes="56px" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Child Booster Seat</p>
                      <p className="mt-0.5 text-xs text-gray-400">4 – 12 yrs</p>
                      <p className="mt-1.5 text-sm font-bold text-brand-blue">€5.00 / Trip</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between rounded-xl border border-gray-200 p-1">
                    <button type="button" onClick={() => setChildBooster(Math.max(0, childBooster - 1))} className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">−</button>
                    <span className="text-sm font-bold text-gray-900">{childBooster}</span>
                    <button type="button" onClick={() => setChildBooster(Math.min(3, childBooster + 1))} className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue text-xl font-bold text-white hover:bg-brand-blue/90 transition-colors">+</button>
                  </div>
                </div>

                {/* Second Driver */}
                <div className={`flex flex-col rounded-2xl border p-4 shadow-sm transition-colors ${addDriver ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-white'}`}>
                  <div className="flex items-start gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-brand-blue/8">
                      <Image src="/Second_Driver.png" alt="Second Driver" fill className="object-cover" sizes="56px" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Second Driver</p>
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3"><path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" /></svg>
                        Free
                      </span>
                      <p className="mt-1.5 text-xs text-gray-500">Add another driver to your rental for free.</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setAddDriver(!addDriver)} className={`mt-auto w-full rounded-xl border py-3 text-sm font-semibold transition-colors ${addDriver ? 'border-green-300 bg-green-100 text-green-700' : 'border-gray-200 bg-white text-gray-700 hover:border-brand-blue/40'}`}>
                    {addDriver ? '✓ Added' : '+ Add Driver'}
                  </button>
                </div>

              </div>
            </div>

            {/* Section 3: Customer Details */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-poppins flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue shrink-0" aria-hidden>
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
                3. Customer Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" required className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" required className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
                  <div className="flex gap-2">
                    <select value={phoneDial} onChange={(e) => setPhoneDial(e.target.value)} className="rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-sm text-gray-700 shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-blue/30">
                      {COUNTRY_CODES.map((c) => <option key={c.code} value={c.dial}>{c.flag} {c.dial}</option>)}
                    </select>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="252 52 52" className={inputCls + ' flex-1'} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">WhatsApp Number <span className="text-gray-400">(Optional)</span></label>
                  <div className="flex gap-2">
                    <select value={whatsappDial} onChange={(e) => setWhatsappDial(e.target.value)} className="rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-sm text-gray-700 shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-blue/30">
                      {COUNTRY_CODES.map((c) => <option key={c.code} value={c.dial}>{c.flag} {c.dial}</option>)}
                    </select>
                    <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="252 52 52" className={inputCls + ' flex-1'} />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Payment Method */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-poppins flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue shrink-0" aria-hidden>
                  <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                  <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                </svg>
                4. Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {([
                  { id: 'arrival' as const, label: 'Cash on Arrival', sub: 'Pay cash when the chauffeur arrives' },
                  { id: 'card' as const, label: 'Card on Arrival', sub: 'Pay by card when the chauffeur arrives' },
                ] as const).map((opt) => {
                  const active = payment === opt.id;
                  return (
                    <label key={opt.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${active ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value={opt.id} checked={active} onChange={() => setPayment(opt.id)} className="sr-only" />
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${active ? 'border-brand-blue' : 'border-gray-300'}`}>
                        {active && <span className="h-2.5 w-2.5 rounded-full bg-brand-blue" />}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-800">{opt.label}</p>
                          {opt.id === 'card' && <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">+3% charge</span>}
                        </div>
                        <p className="text-xs text-gray-500">{opt.sub}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-brand-blue" />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="#" className="text-brand-blue underline hover:text-brand-blue/80">Terms &amp; Conditions</Link>
                {' '}and{' '}
                <Link href="#" className="text-brand-blue underline hover:text-brand-blue/80">Privacy Policy</Link>.*
              </span>
            </label>
          </div>

          {/* RIGHT: Summary */}
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-4 overflow-hidden rounded-2xl shadow-lg border border-gray-200">
              <div className="bg-brand-blue px-5 py-4">
                <h2 className="font-poppins text-base font-bold text-white">Booking Summary</h2>
              </div>
              <div className="bg-white">
                {/* Car info */}
                <div className="px-5 pt-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image src={car.image} alt={car.name} fill className="object-cover" sizes="96px" />
                    </div>
                    <div>
                      <p className="font-poppins text-base font-bold text-gray-900">{car.name}</p>
                      <span className="mt-1 inline-block rounded-full bg-brand-blue/10 px-2 py-0.5 text-xs font-medium text-brand-blue">With Chauffeur</span>
                      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                        <span>{car.passengers} passengers</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="px-5 py-4 border-b border-gray-100 space-y-3">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden>
                      <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tour Period</p>
                      <p className="text-sm font-medium text-gray-800">{fmtDate(startDate)} — {fmtDate(endDate)}</p>
                      <p className="text-xs text-gray-500">{startTime} · {pickupLoc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden>
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Duration</span>
                      <span className="text-sm font-bold text-gray-800">{duration} {duration === 1 ? 'Day' : 'Days'}</span>
                    </div>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="px-5 py-4 border-b border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Chauffeur Rate ({duration} {duration === 1 ? 'day' : 'days'})</span>
                    <span className="font-medium">€{car.price}.00 / day</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Sub Total</span>
                    <span className="font-medium">€{fmt2(subtotal)}</span>
                  </div>
                </div>

                {(extrasTotal > 0 || addDriver) && (
                  <div className="px-5 py-4 border-b border-gray-100 space-y-2 text-sm">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Extras</p>
                    {babySeat > 0 && (
                      <div className="flex justify-between text-gray-700">
                        <span>Baby Seat ({babySeat})</span>
                        <span className="font-medium">€{fmt2(babySeat * 5)}</span>
                      </div>
                    )}
                    {childBooster > 0 && (
                      <div className="flex justify-between text-gray-700">
                        <span>Child Booster ({childBooster})</span>
                        <span className="font-medium">€{fmt2(childBooster * 5)}</span>
                      </div>
                    )}
                    {addDriver && (
                      <div className="flex justify-between text-gray-700">
                        <span>Second Driver</span>
                        <span className="font-medium text-green-600">Free</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Totals */}
                <div className="px-5 py-4 border-b border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between font-semibold text-gray-800">
                    <span>Total</span>
                    <span>€{fmt2(total)}</span>
                  </div>
                  {payment === 'card' && (
                    <div className="flex justify-between text-gray-500">
                      <span>Card Surcharge (3%)</span>
                      <span>€{fmt2(cardSurcharge)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-poppins text-base font-bold text-brand-blue pt-1 border-t border-gray-100">
                    <span>Outstanding Balance</span>
                    <span>€{fmt2(outstanding)}</span>
                  </div>
                </div>

                {/* Submit */}
                <div className="px-5 pt-4 pb-5">
                  <button type="submit" className="w-full rounded-xl bg-brand-yellow py-3.5 text-base font-bold text-gray-900 transition-colors hover:bg-brand-yellow/90 shadow-sm">
                    Book Now
                  </button>
                  <div className="mt-2.5 flex items-center justify-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gray-400" aria-hidden>
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-gray-400">No payment needed now</p>
                  </div>
                </div>

                {/* Need Help */}
                <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                  <p className="font-poppins text-sm font-semibold text-gray-800">Need Help?</p>
                  <p className="mt-0.5 text-xs text-gray-500">Our team is here to help you 24/7</p>
                  <div className="mt-3 space-y-2">
                    <Link href="tel:+2482711073" className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-brand-blue/30">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden>
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.954l-1.293 1.293a13.044 13.044 0 0 0 6.586 6.586l1.293-1.293a1.875 1.875 0 0 1 1.954-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                      </svg>
                      +248 271 10 73
                    </Link>
                    <Link href="https://wa.me/2482796837" className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-green-300">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-green-500" aria-hidden>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.112 1.52 5.844L.057 23.143a.5.5 0 0 0 .6.6l5.3-1.463A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.52-5.17-1.43l-.37-.22-3.14.866.882-3.22-.24-.37A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                      </svg>
                      Chat on WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
