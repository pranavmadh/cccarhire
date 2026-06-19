import path from "path";
import { supabase } from "./supabase";
import type { CreateVehicleInput, Transmission, Vehicle, VehicleCategory } from "./types/vehicle";

export async function getAllVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Vehicle[];
}

export async function addVehicle(input: CreateVehicleInput): Promise<Vehicle> {
  const slug = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  let id = slug || `vehicle-${Date.now()}`;

  const { data: existing } = await supabase
    .from("vehicles")
    .select("id")
    .eq("id", id)
    .maybeSingle();
  if (existing) id = `${id}-${Date.now()}`;

  const vehicle: Vehicle = {
    id,
    name: input.name,
    type: input.type,
    category: input.category,
    modelYear: input.modelYear,
    seats: input.seats,
    luggage: input.luggage,
    transmission: input.transmission,
    airConditioning: input.airConditioning,
    fuelConsumption: input.fuelConsumption,
    features: input.features ?? [],
    price: input.price,
    discountedPrice: input.discountedPrice,
    discountedMinDays: input.discountedMinDays,
    insuranceCdwPrice: input.insuranceCdwPrice,
    insuranceReduced800Price: input.insuranceReduced800Price,
    insuranceReducedPrice: input.insuranceReducedPrice,
    image: input.imagePath,
    popular: input.popular,
    createdAt: new Date().toISOString(),
  };

  const { error } = await supabase.from("vehicles").insert(vehicle);
  if (error) throw new Error(error.message);
  return vehicle;
}

export async function saveUploadedImage(file: File): Promise<string> {
  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  const allowed = [".jpg", ".jpeg", ".png", ".webp"];
  if (!allowed.includes(ext)) throw new Error("Image must be JPG, PNG, or WebP");

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("vehicle-images")
    .upload(filename, buffer, { contentType: file.type });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("vehicle-images").getPublicUrl(filename);
  return data.publicUrl;
}

export async function updateVehicle(
  id: string,
  input: {
    name?: string;
    type?: string;
    category?: VehicleCategory;
    modelYear?: number | null;
    seats?: number;
    luggage?: number | null;
    transmission?: Transmission;
    airConditioning?: boolean;
    fuelConsumption?: string | null;
    features?: string[];
    price?: number;
    discountedPrice?: number | null;
    discountedMinDays?: number | null;
    insuranceCdwPrice?: number | null;
    insuranceReduced800Price?: number | null;
    insuranceReducedPrice?: number | null;
    popular?: boolean;
    imagePath?: string;
  }
): Promise<Vehicle> {
  const updates: Record<string, unknown> = {};
  if (input.name !== undefined) updates.name = input.name;
  if (input.type !== undefined) updates.type = input.type;
  if (input.category !== undefined) updates.category = input.category;
  if ("modelYear" in input) updates.modelYear = input.modelYear;
  if (input.seats !== undefined) updates.seats = input.seats;
  if ("luggage" in input) updates.luggage = input.luggage;
  if (input.transmission !== undefined) updates.transmission = input.transmission;
  if (input.airConditioning !== undefined) updates.airConditioning = input.airConditioning;
  if ("fuelConsumption" in input) updates.fuelConsumption = input.fuelConsumption;
  if (input.features !== undefined) updates.features = input.features;
  if (input.price !== undefined) updates.price = input.price;
  if ("discountedPrice" in input) updates.discountedPrice = input.discountedPrice;
  if ("discountedMinDays" in input) updates.discountedMinDays = input.discountedMinDays;
  if ("insuranceCdwPrice" in input) updates.insuranceCdwPrice = input.insuranceCdwPrice;
  if ("insuranceReduced800Price" in input) updates.insuranceReduced800Price = input.insuranceReduced800Price;
  if ("insuranceReducedPrice" in input) updates.insuranceReducedPrice = input.insuranceReducedPrice;
  if (input.popular !== undefined) updates.popular = input.popular;
  if (input.imagePath !== undefined) updates.image = input.imagePath;

  const { data, error } = await supabase
    .from("vehicles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Vehicle;
}

export async function removeVehicle(id: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("vehicles")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) throw new Error(error.message);
  return (data?.length ?? 0) > 0;
}

export function slugifyId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
