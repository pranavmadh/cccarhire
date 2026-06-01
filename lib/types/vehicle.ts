export type VehicleCategory = "suv" | "hatchback" | "compact";
export type Transmission = "Automatic" | "Manual";

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
  popular: boolean;
  imagePath: string;
}
