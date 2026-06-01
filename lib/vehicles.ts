import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { CreateVehicleInput, Vehicle } from "./types/vehicle";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "vehicles.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "vehicles");

const SEED_VEHICLES: Vehicle[] = [
  {
    id: "suzuki-swift",
    name: "Suzuki Swift",
    type: "Compact",
    category: "compact",
    modelYear: 2023,
    seats: 5,
    luggage: 1,
    transmission: "Automatic",
    airConditioning: true,
    price: 45,
    discountedPrice: 40,
    discountedMinDays: 5,
    fuelConsumption: "4/4.5L per 100km",
    features: ["Radio", "Bluetooth", "USB", "AUX", "Power Steering", "Power Windows"],
    image: "/hero_image4.png",
    popular: false,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "suzuki-dzire",
    name: "Suzuki Dzire",
    type: "Hatchback",
    category: "hatchback",
    modelYear: 2022,
    seats: 5,
    luggage: 2,
    transmission: "Automatic",
    airConditioning: true,
    price: 50,
    discountedPrice: 45,
    discountedMinDays: 4,
    fuelConsumption: "4/4.5L per 100km",
    features: ["Radio", "Bluetooth", "USB", "AUX", "Power Steering", "Power Windows"],
    image: "/hero_image3.png",
    popular: false,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "suzuki-fronx",
    name: "Suzuki Fronx",
    type: "SUV",
    category: "suv",
    modelYear: 2025,
    seats: 5,
    luggage: 2,
    transmission: "Automatic",
    airConditioning: true,
    price: 55,
    discountedPrice: 50,
    discountedMinDays: 4,
    fuelConsumption: "4.9L per 100km",
    features: ["Radio", "Bluetooth", "USB", "AUX", "Power Steering", "Power Windows"],
    image: "/hero_image2.png",
    popular: true,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "suzuki-brezza",
    name: "Suzuki Brezza",
    type: "SUV",
    category: "suv",
    modelYear: 2025,
    seats: 5,
    luggage: 2,
    transmission: "Automatic",
    airConditioning: true,
    price: 65,
    discountedPrice: 60,
    discountedMinDays: 3,
    fuelConsumption: "4/5L per 100km",
    features: ["Radio", "Bluetooth", "USB", "AUX", "Power Steering", "Power Windows"],
    image: "/hero_image.png",
    popular: false,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "suzuki-ertiga",
    name: "Suzuki Ertiga (7 Seater)",
    type: "MPV",
    category: "suv",
    modelYear: 2024,
    seats: 7,
    luggage: 2,
    transmission: "Automatic",
    airConditioning: true,
    price: 70,
    discountedPrice: 65,
    discountedMinDays: 3,
    fuelConsumption: "4.9/5L per 100km",
    features: ["Radio", "Bluetooth", "USB", "AUX", "Power Steering", "Power Windows"],
    image: "/hero_image3.png",
    popular: false,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
];

async function ensureDataFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf-8");
  } catch {
    await writeFile(DATA_FILE, JSON.stringify(SEED_VEHICLES, null, 2), "utf-8");
  }
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  await ensureDataFile();
  const raw = await readFile(DATA_FILE, "utf-8");
  const vehicles = JSON.parse(raw) as Vehicle[];
  return vehicles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addVehicle(input: CreateVehicleInput): Promise<Vehicle> {
  await ensureDataFile();
  const vehicles = await getAllVehicles();

  const slug = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  let id = slug || `vehicle-${Date.now()}`;
  if (vehicles.some((v) => v.id === id)) {
    id = `${id}-${Date.now()}`;
  }

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
    features: input.features,
    price: input.price,
    discountedPrice: input.discountedPrice,
    discountedMinDays: input.discountedMinDays,
    image: input.imagePath,
    popular: input.popular,
    createdAt: new Date().toISOString(),
  };

  vehicles.unshift(vehicle);
  await writeFile(DATA_FILE, JSON.stringify(vehicles, null, 2), "utf-8");
  return vehicle;
}

export async function saveUploadedImage(file: File): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  const allowed = [".jpg", ".jpeg", ".png", ".webp"];
  if (!allowed.includes(ext)) {
    throw new Error("Image must be JPG, PNG, or WebP");
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  return `/uploads/vehicles/${filename}`;
}

export async function removeVehicle(id: string): Promise<boolean> {
  await ensureDataFile();
  const raw = await readFile(DATA_FILE, "utf-8");
  const vehicles = JSON.parse(raw) as Vehicle[];
  const index = vehicles.findIndex((v) => v.id === id);
  if (index === -1) return false;
  vehicles.splice(index, 1);
  await writeFile(DATA_FILE, JSON.stringify(vehicles, null, 2), "utf-8");
  return true;
}

export function slugifyId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
