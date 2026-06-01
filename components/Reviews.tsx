import { fetchGoogleReviews } from "@/lib/reviews";
import type { GoogleReview } from "@/lib/reviews";
import ReviewsCarousel from "@/components/ReviewsCarousel";

/* ── Real customer reviews from Google ── */
const STATIC_REVIEWS = [
  {
    displayName: "Guido Rickert",
    sub: "3 months ago",
    rating: 5,
    text: "Top rental on Praslin! Brand new car, super clean, super friendly mate handing over the car. All super easy, perfect on time, more like a friend handing over his own car. It couldn't have been any better. 10 Stars for CC Car Hire!",
    photoUri: null,
  },
  {
    displayName: "Sophie B",
    sub: "3 months ago",
    rating: 5,
    text: "Great service from Betina and her son. The car was ready at the Cat Cocos carpark as soon as we arrived, no waiting needed, and they both answered the phone promptly. The car was extremely clean when given to us, and it was the most affordable choice out of several car hire companies on the island. Highly recommend!",
    photoUri: null,
  },
  {
    displayName: "Mumtaz Seedat",
    sub: "5 months ago",
    rating: 5,
    text: "Highly recommend for airport transfers as well as taxi service to get around Praslin. Betina responds quickly and pricing has been the best available. The mini bus was comfortable, spacious and air conditioned.",
    photoUri: null,
  },
  {
    displayName: "Jacqueline Embacher",
    sub: "6 months ago",
    rating: 5,
    text: "Perfect! We rented a car during our stay on Praslin and everything went great! Very flexible with the time, absolutely fair price and the car came in a good condition (automatic also!) Highly recommend this place!",
    photoUri: null,
  },
  {
    displayName: "Valentin Valdo",
    sub: "6 months ago",
    rating: 5,
    text: "We rented a car with CC Car Hire Praslin and we couldn't be happier. After a flight change, our travel dates changed and Betina was very nice and accommodating. We were able to adapt our reservation. Pick up and drop off were both very smooth.",
    photoUri: null,
  },
  {
    displayName: "Tom L",
    sub: "6 months ago",
    rating: 5,
    text: "Excellent car rental service. We booked a car for a one-day trip on Praslin at short notice, and everything went smoothly from start to finish. The car was almost new, clean, and in perfect condition. Communication was quick and easy throughout. Highly recommended.",
    photoUri: null,
  },
  {
    displayName: "Anett Wirth",
    sub: "6 months ago",
    rating: 5,
    text: "We had a small Suzuki Swift for a week. It was in excellent condition, looked very well-maintained, like new. Pickup at the ferry went smoothly, and the return was handled without any problems. Thank you so much for your trust. We'd gladly use your services again next time.",
    photoUri: null,
  },
  {
    displayName: "Riccardo Travaglini",
    sub: "6 months ago",
    rating: 5,
    text: "Very kind and supportive team! The guy that gave us the car was very polite and professional. The car was brand new and in perfect conditions. Made our trip to Praslin extremely comfortable! We hope to see you again guys!",
    photoUri: null,
  },
  {
    displayName: "Peter Puetz",
    sub: "7 months ago",
    rating: 5,
    text: "Excellent service, modern and new car and a very smooth conversation via WhatsApp. We arrived earlier than expected and it was no problem to have the car picked up even at that time. Very friendly, definitely recommended.",
    photoUri: null,
  },
  {
    displayName: "Steve",
    sub: "7 months ago",
    rating: 5,
    text: "The contact/booking with Betina via WhatsApp worked perfectly. The punctual handover by the friendly staff was fast, correct and uncomplicated. The price and fuel regulations were fair. Highly recommended.",
    photoUri: null,
  },
  {
    displayName: "Agnieszka W.",
    sub: "8 months ago",
    rating: 5,
    text: "It was the first time I rented a car via WhatsApp. I must admit I had some doubts, but I read the reviews and decided to give it a try. It turned out to be a great decision! Communication with Betina was instant — she made sure everything was taken care of.",
    photoUri: null,
  },
  {
    displayName: "Michal Chrapčiak",
    sub: "8 months ago",
    rating: 5,
    text: "Highly recommended this car hire company. Everything went smooth, communication with Betina was perfect. The car is nice, well taken care of — it's a brand new car! Definitely would hire again.",
    photoUri: null,
  },
  {
    displayName: "S Chan",
    sub: "8 months ago",
    rating: 5,
    text: "We used car rental companies a lot. Without a doubt, this one has gone above our expectations. They were very flexible by dropping the car and taking it back from the locations we asked them to. Absolutely brilliant.",
    photoUri: null,
  },
  {
    displayName: "manali parkar",
    sub: "8 months ago",
    rating: 5,
    text: "We rented a car during our stay in Praslin and found the service to be very convenient and reasonably priced. Benita was extremely helpful and made the whole process smooth. Having the car gave us the freedom to explore Praslin at our own pace.",
    photoUri: null,
  },
  {
    displayName: "marcel Marcii",
    sub: "9 months ago",
    rating: 5,
    text: "We arrived on the island of Praslin on Saturday, then contacted CC Car Hire spontaneously through our accommodation, and were absolutely impressed with the service. Brad delivered the car to us and the handover couldn't have been easier! Thanks for that.",
    photoUri: null,
  },
];

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-brand-yellow" aria-hidden>
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
    </svg>
  );
}

export default async function Reviews() {
  const googleData = await fetchGoogleReviews();

  /* ── Decide what to render ── */
  const rating = googleData?.rating ?? 5.0;
  const reviewCount = googleData?.userRatingCount ?? 80;
  const displayRating = rating.toFixed(1);

  type DisplayReview = {
    name: string;
    sub: string;
    rating: number;
    text: string;
    photoUri: string | null;
  };

  let reviews: DisplayReview[];

  if (googleData?.reviews?.length) {
    reviews = googleData.reviews
      .filter((r: GoogleReview) => r.text?.text)
      .map((r: GoogleReview) => ({
        name: r.authorAttribution.displayName,
        sub: r.relativePublishTimeDescription,
        rating: r.rating,
        text: r.text!.text,
        photoUri: r.authorAttribution.photoUri ?? null,
      }));
  } else {
    reviews = STATIC_REVIEWS.map((r) => ({
      name: r.displayName,
      sub: r.sub,
      rating: r.rating,
      text: r.text,
      photoUri: r.photoUri,
    }));
  }

  return (
    <section id="reviews" className="bg-gray-50 py-16 sm:py-20" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center">
          <p className="font-poppins text-md font-bold uppercase tracking-wider text-brand-blue">
            Customer Reviews
            <span className="mx-auto mt-2 block h-0.5 w-10 rounded-full bg-brand-yellow" />
          </p>
          <h2
            id="reviews-heading"
            className="font-poppins mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 sm:text-lg">
            Trusted by travellers from around the world exploring the beautiful island of Praslin.
          </p>

          {/* Overall rating badge */}
          <div className="mt-8 inline-flex items-center gap-5 rounded-2xl bg-white px-7 py-5 shadow-sm ring-1 ring-gray-100">
            <div className="text-center">
              <p className="font-poppins text-5xl font-bold text-gray-900 leading-none">
                {displayRating}
              </p>
              <div className="mt-2 flex items-center justify-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
              </div>
              <p className="mt-1 text-xs text-gray-400">out of 5</p>
            </div>
            <div className="h-14 w-px bg-gray-200" />
            <div className="text-left">
              <p className="font-poppins text-2xl font-bold text-gray-900">{reviewCount}+</p>
              <p className="text-sm text-gray-500">Google Reviews</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=CC+Carhire+Amitie+Praslin`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand-blue underline-offset-2 hover:underline"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Review carousel */}
        <div className="mt-12">
          <ReviewsCarousel reviews={reviews} />
        </div>

        {/* Link to all reviews */}
        <div className="mt-8 text-center">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=CC+Carhire+Amitie+Praslin`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-brand-blue/30 hover:text-brand-blue"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            See all {reviewCount}+ reviews on Google
          </a>
        </div>

      </div>
    </section>
  );
}
