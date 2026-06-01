export interface GoogleReview {
  rating: number;
  text?: { text: string; languageCode: string };
  relativePublishTimeDescription: string;
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  publishTime: string;
}

export interface PlaceReviewData {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
}

export async function fetchGoogleReviews(): Promise<PlaceReviewData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    return res.json() as Promise<PlaceReviewData>;
  } catch {
    return null;
  }
}
