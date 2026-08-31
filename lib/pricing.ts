export interface DiscountableVehicle {
  price: number;
  discountedPrice?: number | null;
  discountedMinDays?: number | null;
  longTermDiscountPrice?: number | null;
  longTermDiscountMinDays?: number | null;
}

export interface RateForDuration {
  rate: number;
  tier: "longTerm" | "discount" | "base";
}

/** Picks the best applicable rate for a rental duration, preferring the deepest discount tier the duration qualifies for. */
export function getRateForDuration(
  vehicle: DiscountableVehicle,
  duration: number
): RateForDuration {
  if (
    vehicle.longTermDiscountPrice &&
    vehicle.longTermDiscountMinDays &&
    duration >= vehicle.longTermDiscountMinDays
  ) {
    return { rate: vehicle.longTermDiscountPrice, tier: "longTerm" };
  }
  if (
    vehicle.discountedPrice &&
    vehicle.discountedMinDays &&
    duration >= vehicle.discountedMinDays
  ) {
    return { rate: vehicle.discountedPrice, tier: "discount" };
  }
  return { rate: vehicle.price, tier: "base" };
}
