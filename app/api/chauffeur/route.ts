import { addChauffeurCar, getAllChauffeurCars, saveChauffeurImage } from "@/lib/chauffeur-cars";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cars = await getAllChauffeurCars();
    return NextResponse.json({ cars });
  } catch (error) {
    console.error("GET /api/chauffeur:", error);
    return NextResponse.json({ error: "Failed to load chauffeur cars" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const adminSecret = process.env.ADMIN_SECRET;
    if (adminSecret) {
      const provided =
        request.headers.get("x-admin-secret") ??
        new URL(request.url).searchParams.get("secret");
      if (provided !== adminSecret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const price = Number(formData.get("price"));
    const passengers = Number(formData.get("passengers"));
    const imageFile = formData.get("image");

    if (!name) {
      return NextResponse.json({ error: "Car name is required" }, { status: 400 });
    }
    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
    }
    if (!Number.isFinite(passengers) || passengers < 1 || passengers > 20) {
      return NextResponse.json({ error: "Passengers must be between 1 and 20" }, { status: 400 });
    }
    if (!(imageFile instanceof File) || imageFile.size === 0) {
      return NextResponse.json({ error: "Car image is required" }, { status: 400 });
    }
    if (imageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be smaller than 5MB" }, { status: 400 });
    }

    const imagePath = await saveChauffeurImage(imageFile);
    const car = await addChauffeurCar({ name, price, passengers, imagePath });

    revalidatePath("/");
    revalidatePath("/chauffeur");
    return NextResponse.json({ car }, { status: 201 });
  } catch (error) {
    console.error("POST /api/chauffeur:", error);
    const message = error instanceof Error ? error.message : "Failed to add car";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
