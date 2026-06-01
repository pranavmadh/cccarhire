import { removeChauffeurCar, saveChauffeurImage, updateChauffeurCar } from "@/lib/chauffeur-cars";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/chauffeur/[id]">
) {
  try {
    const adminSecret = process.env.ADMIN_SECRET;
    if (adminSecret) {
      const provided = request.headers.get("x-admin-secret") ?? new URL(request.url).searchParams.get("secret");
      if (provided !== adminSecret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const { id } = await ctx.params;
    if (!id) return NextResponse.json({ error: "Car ID is required" }, { status: 400 });

    const formData = await request.formData();
    const input: Parameters<typeof updateChauffeurCar>[1] = {};

    const name = String(formData.get("name") ?? "").trim();
    if (name) input.name = name;

    const priceRaw = formData.get("price");
    if (priceRaw !== null && priceRaw !== "") {
      const price = Number(priceRaw);
      if (!Number.isFinite(price) || price <= 0) return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
      input.price = price;
    }

    const passengersRaw = formData.get("passengers");
    if (passengersRaw !== null && passengersRaw !== "") {
      const passengers = Number(passengersRaw);
      if (!Number.isFinite(passengers) || passengers < 1 || passengers > 20) return NextResponse.json({ error: "Passengers must be between 1 and 20" }, { status: 400 });
      input.passengers = passengers;
    }

    const imageFile = formData.get("image");
    if (imageFile instanceof File && imageFile.size > 0) {
      if (imageFile.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Image must be smaller than 5MB" }, { status: 400 });
      input.imagePath = await saveChauffeurImage(imageFile);
    }

    const car = await updateChauffeurCar(id, input);
    return NextResponse.json({ car });
  } catch (error) {
    console.error("PATCH /api/chauffeur/[id]:", error);
    const message = error instanceof Error ? error.message : "Failed to update car";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  ctx: RouteContext<"/api/chauffeur/[id]">
) {
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

    const { id } = await ctx.params;
    const removed = await removeChauffeurCar(id);
    if (!removed) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/chauffeur/[id]:", error);
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
  }
}
