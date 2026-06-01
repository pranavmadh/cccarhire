import path from "path";
import { supabase } from "./supabase";
import type { ChauffeurCar, CreateChauffeurCarInput } from "./types/chauffeur-car";

export async function getAllChauffeurCars(): Promise<ChauffeurCar[]> {
  const { data, error } = await supabase
    .from("chauffeur_cars")
    .select("*")
    .order("createdAt", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as ChauffeurCar[];
}

export async function addChauffeurCar(input: CreateChauffeurCarInput): Promise<ChauffeurCar> {
  const slug = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  let id = slug || `chauffeur-car-${Date.now()}`;

  const { data: existing } = await supabase
    .from("chauffeur_cars")
    .select("id")
    .eq("id", id)
    .maybeSingle();
  if (existing) id = `${id}-${Date.now()}`;

  const car: ChauffeurCar = {
    id,
    name: input.name,
    price: input.price,
    passengers: input.passengers,
    image: input.imagePath,
    createdAt: new Date().toISOString(),
  };

  const { error } = await supabase.from("chauffeur_cars").insert(car);
  if (error) throw new Error(error.message);
  return car;
}

export async function updateChauffeurCar(
  id: string,
  input: { name?: string; price?: number; passengers?: number; imagePath?: string }
): Promise<ChauffeurCar> {
  const updates: Record<string, unknown> = {};
  if (input.name !== undefined) updates.name = input.name;
  if (input.price !== undefined) updates.price = input.price;
  if (input.passengers !== undefined) updates.passengers = input.passengers;
  if (input.imagePath !== undefined) updates.image = input.imagePath;

  const { data, error } = await supabase
    .from("chauffeur_cars")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as ChauffeurCar;
}

export async function removeChauffeurCar(id: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("chauffeur_cars")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) throw new Error(error.message);
  return (data?.length ?? 0) > 0;
}

export async function saveChauffeurImage(file: File): Promise<string> {
  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  const allowed = [".jpg", ".jpeg", ".png", ".webp"];
  if (!allowed.includes(ext)) throw new Error("Image must be JPG, PNG, or WebP");

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("chauffeur-images")
    .upload(filename, buffer, { contentType: file.type });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("chauffeur-images").getPublicUrl(filename);
  return data.publicUrl;
}
