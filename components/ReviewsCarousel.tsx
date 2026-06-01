'use client';

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type ReviewItem = {
  name: string;
  sub: string;
  rating: number;
  text: string;
  photoUri: string | null;
};

/* ── Icons ── */
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1}
      className="h-4 w-4 text-brand-yellow"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Avatar({ name, photoUri }: { name: string; photoUri: string | null }) {
  if (photoUri) {
    return (
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image src={photoUri} alt={name} fill className="object-cover" sizes="40px" />
      </div>
    );
  }
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue font-poppins text-sm font-bold text-white">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      {/* Google G watermark */}
      <svg className="absolute right-5 top-5 h-7 w-7 opacity-10" viewBox="0 0 24 24" aria-hidden>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>

      {/* Stars */}
      <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} filled={s <= review.rating} />)}
      </div>

      {/* Text */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
        <Avatar name={review.name} photoUri={review.photoUri} />
        <div>
          <p className="text-sm font-semibold text-gray-900">{review.name}</p>
          <p className="text-xs text-gray-500">{review.sub}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsCarousel({ reviews }: { reviews: ReviewItem[] }) {
  const [index, setIndex] = useState(0);
  const [perSlide, setPerSlide] = useState(3);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* responsive cards-per-slide */
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640) setPerSlide(1);
      else if (window.innerWidth < 1024) setPerSlide(2);
      else setPerSlide(3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = reviews.length;
  const pages = Math.ceil(total / perSlide);

  /* clamp index when perSlide changes */
  useEffect(() => {
    setIndex((i) => Math.min(i, pages - 1));
  }, [pages]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + pages) % pages), [pages]);
  const next = useCallback(() => setIndex((i) => (i + 1) % pages), [pages]);

  /* auto-advance */
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, 4500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index, paused, next]);

  /* the slice of reviews shown on current page */
  const visible = reviews.slice(index * perSlide, index * perSlide + perSlide);

  /* pad to perSlide so layout doesn't jump on last page */
  const padded = [
    ...visible,
    ...Array(Math.max(0, perSlide - visible.length)).fill(null),
  ];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide */}
      <div className={`grid gap-5 ${perSlide === 1 ? "grid-cols-1" : perSlide === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {padded.map((review, i) =>
          review ? (
            <div key={`${index}-${i}`} className="animate-fade-in">
              <ReviewCard review={review} />
            </div>
          ) : (
            <div key={`pad-${i}`} className="invisible" aria-hidden />
          )
        )}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous reviews"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-brand-blue hover:text-brand-blue"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: pages }).map((_, p) => (
            <button
              key={p}
              onClick={() => setIndex(p)}
              aria-label={`Go to page ${p + 1}`}
              className={`rounded-full transition-all ${
                p === index
                  ? "w-6 h-2.5 bg-brand-blue"
                  : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next reviews"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-brand-blue hover:text-brand-blue"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Page counter */}
      <p className="mt-3 text-center text-xs text-gray-400">
        {index + 1} / {pages}
      </p>
    </div>
  );
}
