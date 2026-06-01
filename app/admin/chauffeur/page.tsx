'use client';

import Image from "next/image";
import Link from "next/link";
import { logoutAction } from "@/app/actions/admin-auth";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChauffeurCar } from "@/lib/types/chauffeur-car";

const inputCls =
  "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 transition placeholder:text-gray-400";
const selectCls = inputCls + " cursor-pointer";
const labelCls = "block text-sm font-medium text-gray-700 mb-1.5";

function SectionHeader({ num, title }: { num: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
        {num}
      </div>
      <h2 className="font-poppins text-base font-semibold text-gray-900">{title}</h2>
    </div>
  );
}

export default function AdminChauffeurPage() {
  const [cars, setCars] = useState<ChauffeurCar[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [removeLoadingId, setRemoveLoadingId] = useState<string | null>(null);
  const [editingCar, setEditingCar] = useState<ChauffeurCar | null>(null);

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const adminSecretRef = useRef<HTMLInputElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const [formKey, setFormKey] = useState(0);

  const loadCars = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/chauffeur");
      const data = await res.json();
      if (res.ok) setCars(data.cars);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => { loadCars(); }, [loadCars]);

  function applyFile(file: File) {
    if (mainPreview?.startsWith("blob:")) URL.revokeObjectURL(mainPreview);
    setMainImage(file);
    setMainPreview(URL.createObjectURL(file));
  }
  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) applyFile(f);
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith("image/")) applyFile(f);
  }
  function removeImage() {
    if (mainPreview?.startsWith("blob:")) URL.revokeObjectURL(mainPreview);
    setMainImage(null);
    setMainPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function resetForm() {
    setFormKey((k) => k + 1);
    setEditingCar(null);
    removeImage();
    setMessage(null);
  }

  function startEdit(car: ChauffeurCar) {
    if (mainPreview?.startsWith("blob:")) URL.revokeObjectURL(mainPreview);
    setEditingCar(car);
    setMainImage(null);
    setMainPreview(car.image);
    setMessage(null);
    setFormKey((k) => k + 1);
    formTopRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function doSubmit(form: HTMLFormElement): Promise<boolean> {
    if (!mainImage && !editingCar) {
      setMessage({ type: "error", text: "Please upload a car image." });
      return false;
    }
    setSubmitting(true);
    setMessage(null);

    const fd = new FormData(form);
    fd.delete("image");
    if (mainImage) fd.append("image", mainImage);

    const secret = adminSecretRef.current?.value ?? "";
    const headers: HeadersInit = {};
    if (secret) headers["x-admin-secret"] = secret;

    const url = editingCar ? `/api/chauffeur/${editingCar.id}` : "/api/chauffeur";
    const method = editingCar ? "PATCH" : "POST";

    try {
      const res = await fetch(url, { method, body: fd, headers });
      const data = await res.json();
      if (!res.ok) { setMessage({ type: "error", text: data.error ?? "Failed to save car" }); return false; }
      setMessage({
        type: "success",
        text: editingCar
          ? `${data.car.name} updated successfully!`
          : `${data.car.name} added successfully!`,
      });
      await loadCars();
      if (editingCar) resetForm();
      return true;
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await doSubmit(e.currentTarget);
  }

  async function handleSaveAndAdd(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.closest("form") as HTMLFormElement;
    if (!form.reportValidity()) return;
    const ok = await doSubmit(form);
    if (ok) resetForm();
  }

  async function handleDeleteConfirm(id: string) {
    setRemoveLoadingId(id);
    setMessage(null);
    const secret = adminSecretRef.current?.value ?? "";
    const headers: HeadersInit = {};
    if (secret) headers["x-admin-secret"] = secret;
    try {
      const res = await fetch(`/api/chauffeur/${id}`, { method: "DELETE", headers });
      if (res.ok) {
        setCars((prev) => prev.filter((c) => c.id !== id));
        setMessage({ type: "success", text: "Car removed successfully." });
        if (editingCar?.id === id) resetForm();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error ?? "Failed to remove car" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setRemoveLoadingId(null);
      setDeletingId(null);
    }
  }

  const ec = editingCar;

  return (
    <div className="min-h-screen bg-[#f7f8fc]">

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-4 px-6 py-3.5">
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700" aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="font-poppins text-lg font-bold text-gray-900 leading-tight">
                {ec ? `Editing: ${ec.name}` : "Add Chauffeur Car"}
              </h1>
              <nav className="flex items-center gap-1 text-xs text-gray-400">
                <Link href="/admin" className="hover:text-brand-blue">Admin</Link>
                <span>›</span>
                <span className="text-gray-600">Chauffeur Cars</span>
              </nav>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400 w-56">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
              </svg>
              Search anything…
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin" className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Dashboard
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z" clipRule="evenodd" />
                  </svg>
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" ref={formTopRef}>

        {/* Edit mode banner */}
        {ec && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-xl bg-brand-blue/5 px-4 py-3 ring-1 ring-brand-blue/20">
            <div className="flex items-center gap-2 text-sm font-medium text-brand-blue">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.885L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.42a4 4 0 0 0-.885 1.343Z" />
              </svg>
              Editing <span className="font-semibold">{ec.name}</span> — changes will overwrite the existing record.
            </div>
            <button onClick={resetForm} className="text-xs font-medium text-gray-500 hover:text-gray-800 shrink-0">
              Cancel edit
            </button>
          </div>
        )}

        {/* Status message */}
        {message && (
          <div className={`mb-6 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-800 ring-1 ring-green-200"
              : "bg-red-50 text-red-800 ring-1 ring-red-200"
          }`}>
            {message.type === "success"
              ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-green-500"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" /></svg>
              : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-red-500"><path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>
            }
            {message.text}
          </div>
        )}

        <form key={formKey} onSubmit={handleSave}>
          <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-7 xl:grid-cols-[1fr_420px]">

            {/* LEFT */}
            <div className="space-y-6">

              {/* Section 1: Basic Info */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <SectionHeader num={1} title="Basic Information" />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Car Name <span className="text-red-500">*</span></label>
                    <input name="name" required placeholder="e.g. Nissan Qashqai" className={inputCls} defaultValue={ec?.name ?? ""} />
                  </div>
                  <div>
                    <label className={labelCls}>Passengers <span className="text-red-500">*</span></label>
                    <select name="passengers" required defaultValue={ec ? String(ec.passengers) : ""} className={selectCls}>
                      <option value="" disabled>Select Passengers</option>
                      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "passenger" : "passengers"}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Daily Price (EUR) <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">€</span>
                      <input name="price" type="number" min={1} step={1} required placeholder="100" className={inputCls + " pl-7"} defaultValue={ec?.price ?? ""} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Admin Secret */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <SectionHeader num={3} title="Security" />
                <div>
                  <label className={labelCls}>Admin Secret</label>
                  <input ref={adminSecretRef} name="adminSecret" type="password" placeholder="Only if ADMIN_SECRET is set in .env" className={inputCls} />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pb-8">
                <button type="button" onClick={resetForm} className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue/90 transition-colors disabled:opacity-60"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                  </svg>
                  {submitting ? "Saving…" : ec ? "Update Car" : "Save Car"}
                </button>
                {!ec && (
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleSaveAndAdd}
                    className="inline-flex items-center gap-2 rounded-lg border border-brand-blue bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/5 transition-colors disabled:opacity-60"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                    </svg>
                    Save &amp; Add Another
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="mt-6 space-y-6 lg:mt-0">

              {/* Section 2: Car Image */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <SectionHeader num={2} title="Car Image" />
                {!mainPreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors ${
                      dragging ? "border-brand-blue bg-brand-blue/5" : "border-gray-200 hover:border-brand-blue/50 hover:bg-gray-50"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-12 w-12 text-brand-blue/50 mb-3" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                    <p className="text-sm font-semibold text-gray-700">Upload Car Image</p>
                    <p className="mt-1 text-xs text-gray-400">JPG, PNG or WEBP (Max. 5MB)</p>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleFileInput} className="sr-only" />
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mainPreview} alt="Preview" className="aspect-video w-full object-cover" />
                    {ec && !mainImage && (
                      <div className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                        Current image — upload new to replace
                      </div>
                    )}
                    <button type="button" onClick={removeImage} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80" aria-label="Remove image">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                      </svg>
                    </button>
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 shadow hover:bg-white">
                      Change
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleFileInput} className="sr-only" />
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">💡</span>
                  <h3 className="font-poppins text-sm font-semibold text-amber-800">Tips</h3>
                </div>
                <ul className="space-y-1.5 text-xs text-amber-700 list-disc list-inside">
                  <li>Use a high-quality photo of the actual car.</li>
                  <li>Recommended size: 1200×800px or wider.</li>
                  <li>All chauffeur cars include fuel &amp; professional driver.</li>
                </ul>
              </div>
            </div>
          </div>
        </form>

        {/* Current chauffeur cars */}
        <section className="mt-12 pb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-poppins text-lg font-semibold text-gray-900">
              Chauffeur Fleet
              <span className="ml-1.5 rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-sm font-medium text-brand-blue">{cars.length}</span>
            </h2>
          </div>

          {loadingList ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1,2,3].map((i) => <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-100" />)}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <div key={car.id} className={`relative flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 shadow-sm transition-shadow ${editingCar?.id === car.id ? "ring-brand-blue shadow-md" : "ring-gray-100"}`}>
                  {deletingId === car.id ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-2 text-center">
                      <p className="text-sm font-semibold text-gray-800">Remove <span className="text-red-600">{car.name}</span>?</p>
                      <p className="text-xs text-gray-400">This cannot be undone.</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleDeleteConfirm(car.id)} disabled={removeLoadingId === car.id} className="rounded-lg bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60 transition-colors">
                          {removeLoadingId === car.id ? "Removing…" : "Yes, remove"}
                        </button>
                        <button onClick={() => setDeletingId(null)} disabled={removeLoadingId === car.id} className="rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-60 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                        <Image src={car.image} alt={car.name} fill className="object-cover" sizes="96px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-poppins text-sm font-semibold text-gray-900 truncate">{car.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{car.passengers} passengers</p>
                        <p className="text-sm font-bold text-brand-blue mt-1">€{car.price}/day</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <div className="flex gap-1">
                          <button
                            onClick={() => startEdit(car)}
                            title="Edit car"
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand-blue/20 bg-brand-blue/5 text-brand-blue hover:bg-brand-blue/10 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                              <path d="M2.695 14.763l-1.262 3.154a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.885L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.42a4 4 0 0 0-.885 1.343Z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeletingId(car.id)}
                            title="Remove car"
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
