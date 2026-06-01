import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { ChauffeurCar, CreateChauffeurCarInput } from "./types/chauffeur-car";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "chauffeur-cars.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "chauffer");

const SEED: ChauffeurCar[] = [
  {
    id: "nissan-qashqai",
    name: "Nissan Qashqai",
    price: 100,
    passengers: 3,
    image: "/uploads/chauffer/Nissan_Qashqai.png",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "hyundai-h1",
    name: "Hyundai H1",
    price: 150,
    passengers: 10,
    image: "/uploads/chauffer/Hyundai_h1.png",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "nissan-urvan",
    name: "Nissan Urvan",
    price: 200,
    passengers: 14,
    image: "/uploads/chauffer/Nissan_Urvan.png",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
];

async function ensureDataFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf-8");
  } catch {
    await writeFile(DATA_FILE, JSON.stringify(SEED, null, 2), "utf-8");
  }
}

export async function getAllChauffeurCars(): Promise<ChauffeurCar[]> {
  await ensureDataFile();
  const raw = await readFile(DATA_FILE, "utf-8");
  const cars = JSON.parse(raw) as ChauffeurCar[];
  return cars.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addChauffeurCar(input: CreateChauffeurCarInput): Promise<ChauffeurCar> {
  await ensureDataFile();
  const cars = await getAllChauffeurCars();

  const slug = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  let id = slug || `chauffeur-car-${Date.now()}`;
  if (cars.some((c) => c.id === id)) id = `${id}-${Date.now()}`;

  const car: ChauffeurCar = {
    id,
    name: input.name,
    price: input.price,
    passengers: input.passengers,
    image: input.imagePath,
    createdAt: new Date().toISOString(),
  };

  cars.unshift(car);
  await writeFile(DATA_FILE, JSON.stringify(cars, null, 2), "utf-8");
  return car;
}

export async function removeChauffeurCar(id: string): Promise<boolean> {
  await ensureDataFile();
  const raw = await readFile(DATA_FILE, "utf-8");
  const cars = JSON.parse(raw) as ChauffeurCar[];
  const index = cars.findIndex((c) => c.id === id);
  if (index === -1) return false;
  cars.splice(index, 1);
  await writeFile(DATA_FILE, JSON.stringify(cars, null, 2), "utf-8");
  return true;
}

export async function saveChauffeurImage(file: File): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  const allowed = [".jpg", ".jpeg", ".png", ".webp"];
  if (!allowed.includes(ext)) throw new Error("Image must be JPG, PNG, or WebP");

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  return `/uploads/chauffer/${filename}`;
}
