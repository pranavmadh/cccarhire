'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Vehicle } from '@/lib/types/vehicle';
import { COUNTRY_CODES } from '@/lib/country-codes';

/* ── Constants ── */
const LOCATIONS = [
  'Praslin Domestic Airport',
  'Côte d\'Or',
  'Grand Anse Praslin',
  'Baie Sainte Anne',
  'La Réserve Hotel',
  'Lemuria Resort',
  'Jetty',
  'Other Location',
];

const DEFAULT_INSURANCE_PRICES = { cdw: 0, reduced800: 10, reduced: 15 };

function buildInsuranceOptions(vehicle: Vehicle) {
  return [
    {
      id: 'cdw' as const,
      label: 'CDW Insurance',
      badge: 'Included',
      desc: 'Excess to EUR 1000\nIncluded in the price',
      pricePerDay: vehicle.insuranceCdwPrice ?? DEFAULT_INSURANCE_PRICES.cdw,
    },
    {
      id: 'reduced800' as const,
      label: 'Reduced Excess 800',
      badge: null,
      desc: 'Reduce excess to EUR 800\nfor added peace of mind',
      pricePerDay: vehicle.insuranceReduced800Price ?? DEFAULT_INSURANCE_PRICES.reduced800,
    },
    {
      id: 'reduced' as const,
      label: 'Reduced Excess 500',
      badge: null,
      desc: 'Reduce excess to EUR 500\nfor extra peace of mind',
      pricePerDay: vehicle.insuranceReducedPrice ?? DEFAULT_INSURANCE_PRICES.reduced,
    },
  ];
}

/* ── Helpers ── */
function todayStr() {
  return new Date().toISOString().split('T')[0];
}
function addDays(dateStr: string, n: number) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}
function diffDays(fromDate: string, fromTime: string, toDate: string, toTime: string) {
  const a = new Date(`${fromDate}T${fromTime}`).getTime();
  const b = new Date(`${toDate}T${toTime}`).getTime();
  const hours = (b - a) / 3600000;
  return Math.max(1, Math.ceil(hours / 24));
}
function fmtDate(dateStr: string) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch { return dateStr; }
}
function fmt2(n: number) {
  return n.toFixed(2);
}


/* ── Props ── */
interface Props { vehicle: Vehicle }

export default function BookingForm({ vehicle }: Props) {
  const INSURANCE_OPTIONS = buildInsuranceOptions(vehicle);
  const today = todayStr();
  const sp = useSearchParams();

  const initPickupDate = sp.get('pickupDate') || addDays(today, 1);
  const initDropoffDate = sp.get('dropoffDate') || addDays(today, 4);
  const initLocation = sp.get('location') || 'Praslin Domestic Airport';

  /* Section 1 */
  const [pickupLoc, setPickupLoc] = useState(initLocation);
  const [returnLoc, setReturnLoc] = useState(initLocation);
  const [pickupDate, setPickupDate] = useState(initPickupDate);
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState(initDropoffDate);
  const [returnTime, setReturnTime] = useState('10:00');
  const [pickupFlight, setPickupFlight] = useState('');
  const [returnFlight, setReturnFlight] = useState('');

  /* Section 2 */
  const [insurance, setInsurance] = useState<'cdw' | 'reduced800' | 'reduced'>('cdw');

  /* Section 3 */
  const [babySeat, setBabySeat] = useState(0);
  const [childBooster, setChildBooster] = useState(0);
  const [addDriver, setAddDriver] = useState(false);
  const [tyreWaiver, setTyreWaiver] = useState(false);

  /* Section 5 */
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneDial, setPhoneDial] = useState('+248');
  const [whatsapp, setWhatsapp] = useState('');
  const [whatsappDial, setWhatsappDial] = useState('+248');
  const [driverAge, setDriverAge] = useState('30-65 years');
  const [passengers, setPassengers] = useState(1);

  /* License */
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [licensePreview, setLicensePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  /* Section 6 */
  const [payment, setPayment] = useState<'arrival' | 'card'>('arrival');

  /* ── Price calculation ── */
  const duration = useMemo(() => diffDays(pickupDate, pickupTime, returnDate, returnTime), [pickupDate, pickupTime, returnDate, returnTime]);
  const hasDiscount =
    !!vehicle.discountedPrice &&
    !!vehicle.discountedMinDays &&
    duration >= vehicle.discountedMinDays;
  const ratePerDay = hasDiscount ? vehicle.discountedPrice! : vehicle.price;
  const subtotal = ratePerDay * duration;
  const insPerDay = INSURANCE_OPTIONS.find((o) => o.id === insurance)!.pricePerDay;
  const insTotal = insPerDay * duration;
  const extrasDaily = babySeat * 5 + childBooster * 5 + (tyreWaiver ? 10 * duration : 0);
  const total = subtotal + insTotal + extrasDaily;
  const cardSurcharge = payment === 'card' ? Math.round(total * 0.03 * 100) / 100 : 0;
  const outstanding = Math.round((total + cardSurcharge) * 100) / 100;

  const handlePickupLocChange = (v: string) => {
    setPickupLoc(v);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    setUploadError('');

    let licenseUrl = '';
    if (licenseFile) {
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append('file', licenseFile);
        const res = await fetch('/api/upload-license', { method: 'POST', body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? 'Upload failed');
        licenseUrl = json.url;
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : 'Upload failed');
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    const insLabel = INSURANCE_OPTIONS.find((o) => o.id === insurance)!.label;
    const paymentLabel = payment === 'arrival' ? 'Cash on Arrival' : 'Card on Arrival';

    const extraLines: string[] = [];
    if (babySeat > 0) extraLines.push(`  • Baby Seat x${babySeat}: €${fmt2(babySeat * 5)}`);
    if (childBooster > 0) extraLines.push(`  • Child Booster Seat x${childBooster}: €${fmt2(childBooster * 5)}`);
    if (addDriver) extraLines.push(`  • Second Driver: Free`);
    if (tyreWaiver) extraLines.push(`  • Tyre Waiver: €${fmt2(10 * duration)}`);
    if (extraLines.length === 0) extraLines.push('  None');

    const lines = [
      `🚗 *Booking Request — ${vehicle.name}*`,
      ``,
      `📅 *Rental Details*`,
      `  • Duration: ${duration} ${duration === 1 ? 'day' : 'days'}`,
      `  • Rate: €${ratePerDay}/day${hasDiscount ? ` (discounted)` : ''}`,
      `  • Sub Total: €${fmt2(subtotal)}`,
      ``,
      `📍 *Pickup*`,
      `  • Location: ${pickupLoc}`,
      `  • Date & Time: ${fmtDate(pickupDate)}, ${pickupTime}`,
      ...(pickupFlight ? [`  • Flight: ${pickupFlight}`] : []),
      ``,
      `📍 *Return*`,
      `  • Location: ${returnLoc}`,
      `  • Date & Time: ${fmtDate(returnDate)}, ${returnTime}`,
      ...(returnFlight ? [`  • Flight: ${returnFlight}`] : []),
      ``,
      `🛡️ *Insurance:* ${insLabel}${insPerDay > 0 ? ` — €${fmt2(insTotal)}` : ' (Included)'}`,
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
      `  • Driver Age: ${driverAge}`,
      `  • Passengers: ${passengers}`,
      ...(licenseUrl ? [`  • Driving License: ${licenseUrl}`] : []),
      ``,
      `💳 *Payment Method:* ${paymentLabel}`,
    ];

    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/2482796837?text=${message}`, '_blank');
  };

  /* ── Shared input class ── */
  const inputCls = 'w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition';
  const selectCls = inputCls + ' cursor-pointer';

  return (
    <div>
      {/* ── Progress Stepper ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-2 sm:gap-5">
            {/* Step 1 — completed */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-gray-900 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden>
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-700 leading-tight truncate">Choose Vehicle</p>
                <p className="hidden sm:block text-xs text-gray-400 truncate max-w-[160px]">{vehicle.name} or similar</p>
              </div>
            </div>

            {/* Connector */}
            <div className="h-px w-6 sm:w-16 bg-gray-300 shrink-0" />

            {/* Step 2 — active */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white text-xs sm:text-sm font-bold shadow-sm">
                2
              </div>
              <div className="min-w-0">
                <p className="font-poppins text-xs sm:text-sm font-bold text-brand-blue leading-tight truncate">Complete Booking</p>
                <p className="hidden sm:block text-xs text-gray-500">Add extras &amp; make payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8 xl:grid-cols-[1fr_400px]">

          {/* ══ LEFT: form sections ══ */}
          <div className="space-y-4 sm:space-y-6">

            {/* ── Section 1: Pickup & Return ── */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-poppins flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue shrink-0" aria-hidden>
                  <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 1 0-16 0c0 3.63 1.556 6.326 3.5 8.327a19.583 19.583 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.144.742ZM11.5 13.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd" />
                </svg>
                1. Pickup &amp; Return Details
              </h2>

              {/* Locations row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Pickup Location</label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-blue hidden sm:block" aria-hidden>
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .988.55l.078.041.019.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                    </svg>
                    <select
                      value={pickupLoc}
                      onChange={(e) => handlePickupLocChange(e.target.value)}
                      className={selectCls + ' sm:pl-9'}
                    >
                      {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Return Location</label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-blue hidden sm:block" aria-hidden>
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .988.55l.078.041.019.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                    </svg>
                    <select
                      value={returnLoc}
                      onChange={(e) => setReturnLoc(e.target.value)}
                      className={selectCls + ' sm:pl-9'}
                    >
                      {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pickup row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Pickup Date</label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-blue hidden sm:block" aria-hidden>
                      <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                    </svg>
                    <input
                      type="date"
                      value={pickupDate}
                      min={addDays(today, 1)}
                      onChange={(e) => {
                        setPickupDate(e.target.value);
                        if (e.target.value >= returnDate) setReturnDate(addDays(e.target.value, 1));
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
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => { setPickupTime(e.target.value); setReturnTime(e.target.value); }}
                      className={inputCls + ' sm:pl-9'}
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Flight Number <span className="text-gray-400">(Optional)</span></label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-blue hidden sm:block" aria-hidden>
                      <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.925A1.5 1.5 0 0 0 5.135 9.25h6.115a.25.25 0 0 1 0 .5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.896 28.896 0 0 0 15.293-7.154.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.289Z" />
                    </svg>
                    <input
                      type="text"
                      value={pickupFlight}
                      onChange={(e) => setPickupFlight(e.target.value)}
                      placeholder="Air Seychelles HM123"
                      className={inputCls + ' sm:pl-9'}
                    />
                  </div>
                </div>
              </div>

              {/* Return row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Return Date</label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-blue hidden sm:block" aria-hidden>
                      <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                    </svg>
                    <input
                      type="date"
                      value={returnDate}
                      min={addDays(pickupDate, 1)}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className={inputCls + ' sm:pl-9'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Return Time</label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-blue hidden sm:block" aria-hidden>
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                    </svg>
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className={inputCls + ' sm:pl-9'}
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Flight Number <span className="text-gray-400">(Optional)</span></label>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-blue hidden sm:block" aria-hidden>
                      <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.925A1.5 1.5 0 0 0 5.135 9.25h6.115a.25.25 0 0 1 0 .5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.896 28.896 0 0 0 15.293-7.154.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.289Z" />
                    </svg>
                    <input
                      type="text"
                      value={returnFlight}
                      onChange={(e) => setReturnFlight(e.target.value)}
                      placeholder="Air Seychelles HM456"
                      className={inputCls + ' sm:pl-9'}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 2: Insurance ── */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-poppins flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue shrink-0" aria-hidden>
                  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516 11.209 11.209 0 0 1-7.877-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
                2. Protection &amp; Insurance
              </h2>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {INSURANCE_OPTIONS.map((opt, i) => {
                  const active = insurance === opt.id;
                  const isLastOdd = i === INSURANCE_OPTIONS.length - 1 && INSURANCE_OPTIONS.length % 2 !== 0;
                  return (
                    <label
                      key={opt.id}
                      className={`relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all ${isLastOdd ? 'col-span-2 lg:col-span-1' : ''} ${
                        active
                          ? 'border-brand-blue bg-brand-blue/5'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="insurance"
                        value={opt.id}
                        checked={active}
                        onChange={() => setInsurance(opt.id)}
                        className="sr-only"
                      />
                      {/* Radio dot */}
                      <span className={`mb-3 flex h-4 w-4 items-center justify-center rounded-full border-2 self-start ${active ? 'border-brand-blue' : 'border-gray-300'}`}>
                        {active && <span className="h-2 w-2 rounded-full bg-brand-blue" />}
                      </span>
                      {/* Shield icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-8 w-8 mb-2 mx-auto ${active ? 'text-brand-blue' : 'text-gray-400'}`} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                      <p className="text-center text-sm font-semibold text-gray-800">{opt.label}</p>
                      {opt.badge && (
                        <span className="mx-auto mt-1 rounded bg-brand-blue/10 px-2 py-0.5 text-xs font-medium text-brand-blue">
                          {opt.badge}
                        </span>
                      )}
                      <p className="mt-2 text-center text-xs text-gray-500 whitespace-pre-line leading-relaxed">
                        {opt.desc}
                      </p>
                      <p className={`mt-3 text-center text-sm font-bold ${active ? 'text-brand-blue' : 'text-gray-700'}`}>
                        €{fmt2(opt.pricePerDay)} / Day
                      </p>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ── Section 3: Extras ── */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-poppins flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue shrink-0" aria-hidden>
                  <path d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v.375h3.375A2.625 2.625 0 0 1 18.75 4.875v13.5A2.625 2.625 0 0 1 16.125 21H7.875A2.625 2.625 0 0 1 5.25 18.375V4.875A2.625 2.625 0 0 1 7.875 2.25H11.25v-.375ZM8.625 7.875a.75.75 0 0 0 0 1.5h6.75a.75.75 0 0 0 0-1.5h-6.75Z" />
                </svg>
                3. Extras &amp; Add-ons
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
                  <div className="mt-auto  flex items-center justify-between rounded-xl border border-gray-200 p-1">
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
                  <div className="mt-auto  flex items-center justify-between rounded-xl border border-gray-200 p-1">
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
                      <p className="mt-1.5 text-xs text-gray-500">Add another driver to your rental for free. Must have at least 2 years of driving experience.</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setAddDriver(!addDriver)} className={`mt-auto w-full rounded-xl border py-3 text-sm font-semibold transition-colors ${addDriver ? 'border-green-300 bg-green-100 text-green-700' : 'border-gray-200 bg-white text-gray-700 hover:border-brand-blue/40'}`}>
                    {addDriver ? '✓ Added' : '+ Add Driver'}
                  </button>
                </div>

                {/* Tyre Waiver */}
                <div className={`flex flex-col rounded-2xl border p-4 shadow-sm transition-colors ${tyreWaiver ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-white'}`}>
                  <div className="flex items-start gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-brand-blue/8">
                      <Image src="/Tyre_Waiver.png" alt="Tyre Waiver" fill className="object-cover" sizes="56px" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Tyre Waiver</p>
                      <p className="mt-1 text-xs text-gray-500">Protects against puncture or tyre damage costs.</p>
                      <p className="mt-1.5 text-sm font-bold text-brand-blue">€10.00 / Day</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setTyreWaiver(!tyreWaiver)} className={`mt-auto w-full rounded-xl border py-3 text-sm font-semibold transition-colors ${tyreWaiver ? 'border-green-300 bg-green-100 text-green-700' : 'border-gray-200 bg-white text-gray-700 hover:border-brand-blue/40'}`}>
                    {tyreWaiver ? '✓ Added' : '+ Add Protection'}
                  </button>
                </div>

              </div>
            </div>

            {/* ── Section 5: Customer Details ── */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-poppins flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue shrink-0" aria-hidden>
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
                Customer Details
              </h2>

              <div className="mb-4 rounded-xl border border-brand-blue/20 bg-brand-blue/5 px-4 py-3">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-gray-800">Driver requirement:</span>{' '}
                  The driver must have at least 2 years of driving experience.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter full name"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
                  <div className="flex gap-2">
                    <select
                      value={phoneDial}
                      onChange={(e) => setPhoneDial(e.target.value)}
                      className="rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-sm text-gray-700 shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.dial}>
                          {c.flag} {c.dial} 
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="252 52 52"
                      className={inputCls + ' flex-1'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">WhatsApp Number <span className="text-gray-400">(Optional)</span></label>
                  <div className="flex gap-2">
                    <select
                      value={whatsappDial}
                      onChange={(e) => setWhatsappDial(e.target.value)}
                      className="rounded-lg border border-gray-200 bg-white px-2 py-2.5 text-sm text-gray-700 shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.dial}>
                          {c.flag} {c.dial} 
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="252 52 52"
                      className={inputCls + ' flex-1'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Driver Age</label>
                  <select
                    value={driverAge}
                    onChange={(e) => setDriverAge(e.target.value)}
                    className={selectCls}
                  >
                    {['18-25 years', '26-29 years', '30-65 years', '66+ years'].map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Number of Passengers</label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className={selectCls}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ── Driving License ── */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-poppins flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue shrink-0" aria-hidden>
                  <path fillRule="evenodd" d="M4.5 3.75A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V6a2.25 2.25 0 0 0-2.25-2.25h-15Zm0 1.5h15a.75.75 0 0 1 .75.75V7.5h-16.5V6a.75.75 0 0 1 .75-.75Zm-.75 4.5h16.5V18a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75V9.75Zm3 2.25a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Zm0 3a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Z" clipRule="evenodd" />
                </svg>
                Driving License
                <span className="ml-1 text-xs font-normal text-gray-400">(Optional)</span>
              </h2>
              <p className="text-xs text-gray-400 mb-4">Upload a photo of your license.</p>

              <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center transition hover:border-brand-blue/50 hover:bg-brand-blue/5">
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setLicenseFile(file);
                    setLicensePreview(file ? URL.createObjectURL(file) : '');
                    setUploadError('');
                  }}
                />
                {licensePreview ? (
                  <img src={licensePreview} alt="License preview" className="max-h-48 w-full rounded-lg object-contain shadow-sm" />
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 text-gray-300" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Tap to upload your driving license</p>
                      <p className="mt-0.5 text-xs text-gray-400">JPG, PNG or HEIC · max 10 MB</p>
                    </div>
                  </>
                )}
              </label>

              {licensePreview && (
                <button
                  type="button"
                  onClick={() => { setLicenseFile(null); setLicensePreview(''); setUploadError(''); }}
                  className="mt-2 text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  Remove photo
                </button>
              )}
              {uploadError && (
                <p className="mt-2 text-xs text-red-500">{uploadError}</p>
              )}
            </div>

            {/* ── Section 6: Payment Method ── */}
            <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
              <h2 className="font-poppins flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-blue shrink-0" aria-hidden>
                  <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                  <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                </svg>
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'arrival' as const, label: 'Cash on Arrival', sub: 'Pay cash when you collect the vehicle' },
                  { id: 'card' as const, label: 'Card on Arrival', sub: 'Pay by card when you collect the vehicle' },
                ].map((opt) => {
                  const active = payment === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${active ? 'border-brand-blue bg-brand-blue/5' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <input type="radio" name="payment" value={opt.id} checked={active} onChange={() => setPayment(opt.id)} className="sr-only" />
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${active ? 'border-brand-blue' : 'border-gray-300'}`}>
                        {active && <span className="h-2.5 w-2.5 rounded-full bg-brand-blue" />}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-800">{opt.label}</p>
                          {opt.id === 'card' && (
                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">
                              +3% charge
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{opt.sub}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ══ RIGHT: Booking Summary ══ */}
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-4 overflow-hidden rounded-2xl shadow-lg border border-gray-200">
              {/* Header */}
              <div className="bg-brand-blue px-5 py-4">
                <h2 className="font-poppins text-base font-bold text-white">Booking Summary</h2>
              </div>

              <div className="bg-white">
                {/* Vehicle info */}
                <div className="px-5 pt-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" sizes="96px" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-poppins text-base font-bold text-gray-900">{vehicle.name}</span>
                        <span className="rounded-full bg-brand-blue/10 px-2 py-0.5 text-xs font-medium text-brand-blue">{vehicle.type}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-gray-500">{vehicle.transmission} • Petrol</p>
                      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-brand-blue" aria-hidden>
                            <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM16 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.5 18a4.5 4.5 0 0 1 9 0v.75H5.5V18Z" />
                          </svg>
                          {vehicle.seats} Seats
                        </span>
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-brand-blue" aria-hidden>
                            <path d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v.375h3.375A2.625 2.625 0 0 1 18.75 4.875v13.5A2.625 2.625 0 0 1 16.125 21H7.875A2.625 2.625 0 0 1 5.25 18.375V4.875A2.625 2.625 0 0 1 7.875 2.25H11.25v-.375Z" />
                          </svg>
                          {vehicle.luggage ?? 2} Luggage
                        </span>
                        {vehicle.airConditioning && (
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 text-brand-blue" aria-hidden>
                              <path strokeLinecap="round" d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
                            </svg>
                            A/C
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pickup / Return / Duration */}
                <div className="px-5 py-4 border-b border-gray-100 space-y-3">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden>
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .988.55l.078.041.019.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pickup</p>
                      <p className="text-sm font-medium text-gray-800">{pickupLoc}</p>
                      <p className="text-xs text-gray-500">{fmtDate(pickupDate)}, {pickupTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden>
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .988.55l.078.041.019.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Return</p>
                      <p className="text-sm font-medium text-gray-800">{returnLoc}</p>
                      <p className="text-xs text-gray-500">{fmtDate(returnDate)}, {returnTime}</p>
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
                    <span>Base Rate ({duration} {duration === 1 ? 'Day' : 'Days'})</span>
                    <div className="text-right">
                      {hasDiscount && (
                        <span className="line-through text-gray-400 text-xs mr-1">€{vehicle.price}.00</span>
                      )}
                      <span className={`font-medium ${hasDiscount ? 'text-green-600' : ''}`}>
                        €{ratePerDay}.00 / Day
                      </span>
                    </div>
                  </div>
                  {hasDiscount && (
                    <div className="flex items-center gap-1.5">
                      <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                        Discount applied ({vehicle.discountedMinDays}+ days)
                      </span>
                    </div>
                  )}
                  {!hasDiscount && vehicle.discountedPrice && vehicle.discountedMinDays && (
                    <p className="text-xs text-gray-400">
                      Book {vehicle.discountedMinDays}+ days to get €{vehicle.discountedPrice}/day
                    </p>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>Sub Total</span>
                    <span className="font-medium">€{fmt2(subtotal)}</span>
                  </div>
                </div>

                <div className="px-5 py-4 border-b border-gray-100 space-y-2 text-sm">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Protections &amp; Insurance</p>
                  <div className="flex justify-between text-gray-700">
                    <span>
                      {INSURANCE_OPTIONS.find((o) => o.id === insurance)?.label}
                      {insPerDay === 0 && <span className="ml-1 text-xs text-gray-400">(Included)</span>}
                    </span>
                    <span className="font-medium">€{fmt2(insTotal)}</span>
                  </div>

                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-3 mb-2">Equipment &amp; Services</p>
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
                  {tyreWaiver && (
                    <div className="flex justify-between text-gray-700">
                      <span>Tyre Waiver</span>
                      <span className="font-medium">€{fmt2(10 * duration)}</span>
                    </div>
                  )}
                  {!babySeat && !childBooster && !addDriver && !tyreWaiver && (
                    <p className="text-xs text-gray-400">No extras selected</p>
                  )}
                </div>

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

                {/* Confirm button */}
                <div className="px-5 pt-4 pb-5">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full rounded-xl bg-brand-yellow py-3.5 text-base font-bold text-gray-900 transition-colors hover:bg-brand-yellow/90 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Uploading License…
                      </>
                    ) : 'Book Now'}
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
                  <p className="mt-0.5 text-xs text-gray-500">Our support team is here to help you 24/7</p>
                  <div className="mt-3 space-y-2">
                    <Link
                      href="tel:+2482711073"
                      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-brand-blue/30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden>
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.954l-1.293 1.293a13.044 13.044 0 0 0 6.586 6.586l1.293-1.293a1.875 1.875 0 0 1 1.954-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                      </svg>
                      +248 271 10 73
                    </Link>
                    <Link
                      href="https://wa.me/2482796837"
                      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-green-300"
                    >
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

      {/* ── Footer Trust Strip ── */}
      <div className="mt-10 border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { label: 'Best Price Guarantee', sub: 'Get the best rates with no hidden charges.', icon: 'M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' },
              { label: 'Free Cancellation', sub: 'Cancel up to 48 hours before pickup.', icon: 'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' },
              { label: 'Secure Booking', sub: 'Your data is safe with us.', icon: 'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z' },
              { label: 'Well Maintained Cars', sub: 'Safety and comfort guaranteed.', icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z' },
              { label: '24/7 Customer Support', sub: "We're here to help you anytime.", icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V20.25a.75.75 0 0 0 1.28.53l3.58-3.58' },
            ].map(({ label, sub, icon }) => (
              <div key={label} className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0 mt-0.5 text-brand-blue" aria-hidden>
                  <path d={icon} />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-brand-blue leading-tight">{label}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
