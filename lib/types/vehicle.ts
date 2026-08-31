export type VehicleCategory = "suv" | "hatchback" | "compact";
export type Transmission = "Automatic" | "Manual";
export type TyreWaiverBilling = "daily" | "once";

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  category: VehicleCategory;
  modelYear?: number;
  seats: number;
  luggage?: number;
  transmission: Transmission;
  airConditioning: boolean;
  fuelConsumption?: string;
  features?: string[];
  price: number;
  discountedPrice?: number;
  discountedMinDays?: number;
  longTermDiscountPrice?: number;
  longTermDiscountMinDays?: number;
  insuranceCdwPrice?: number;
  insuranceReduced800Price?: number;
  insuranceReducedPrice?: number;
  tyreWaiverPrice?: number;
  tyreWaiverBilling?: TyreWaiverBilling;
  image: string;
  popular: boolean;
  createdAt: string;
}

export interface CreateVehicleInput {
  name: string;
  type: string;
  category: VehicleCategory;
  modelYear?: number;
  seats: number;
  luggage?: number;
  transmission: Transmission;
  airConditioning: boolean;
  fuelConsumption?: string;
  features?: string[];
  price: number;
  discountedPrice?: number;
  discountedMinDays?: number;
  longTermDiscountPrice?: number;
  longTermDiscountMinDays?: number;
  insuranceCdwPrice?: number;
  insuranceReduced800Price?: number;
  insuranceReducedPrice?: number;
  tyreWaiverPrice?: number;
  tyreWaiverBilling?: TyreWaiverBilling;
  popular: boolean;
  imagePath: string;
}
