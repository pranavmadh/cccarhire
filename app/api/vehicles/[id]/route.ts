import { removeVehicle, saveUploadedImage, updateVehicle } from "@/lib/vehicles";
import type { Transmission, TyreWaiverBilling, VehicleCategory } from "@/lib/types/vehicle";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isValidCategory(v: string): v is VehicleCategory {
  return v === "suv" || v === "hatchback" || v === "compact";
}
function isValidTransmission(v: string): v is Transmission {
  return v === "Automatic" || v === "Manual";
}
function isValidTyreWaiverBilling(v: string): v is TyreWaiverBilling {
  return v === "daily" || v === "once";
}
function parseBool(v: FormDataEntryValue | null): boolean | undefined {
  if (v === null) return undefined;
  const s = String(v).toLowerCase();
  return s === "true" || s === "1" || s === "on" || s === "yes";
}

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/vehicles/[id]">
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
    if (!id) return NextResponse.json({ error: "Vehicle ID is required" }, { status: 400 });

    const formData = await request.formData();
    const input: Parameters<typeof updateVehicle>[1] = {};

    const name = String(formData.get("name") ?? "").trim();
    if (name) input.name = name;

    const type = String(formData.get("type") ?? "").trim();
    if (type) input.type = type;

    const category = String(formData.get("category") ?? "");
    if (category && isValidCategory(category)) input.category = category;
    else if (category) return NextResponse.json({ error: "Category must be suv, hatchback, or compact" }, { status: 400 });

    const transmission = String(formData.get("transmission") ?? "");
    if (transmission && isValidTransmission(transmission)) input.transmission = transmission;
    else if (transmission) return NextResponse.json({ error: "Transmission must be Automatic or Manual" }, { status: 400 });

    const seatsRaw = formData.get("seats");
    if (seatsRaw !== null && seatsRaw !== "") {
      const seats = Number(seatsRaw);
      if (!Number.isFinite(seats) || seats < 2 || seats > 9) return NextResponse.json({ error: "Seats must be between 2 and 9" }, { status: 400 });
      input.seats = seats;
    }

    const luggageRaw = formData.get("luggage");
    if (luggageRaw !== null && luggageRaw !== "") input.luggage = Number(luggageRaw);

    const modelYearRaw = formData.get("modelYear");
    if (modelYearRaw !== null && modelYearRaw !== "") {
      const modelYear = Number(modelYearRaw);
      if (!Number.isFinite(modelYear) || modelYear < 2010 || modelYear > 2100) return NextResponse.json({ error: "Model year must be between 2010 and 2100" }, { status: 400 });
      input.modelYear = modelYear;
    }

    const priceRaw = formData.get("price");
    if (priceRaw !== null && priceRaw !== "") {
      const price = Number(priceRaw);
      if (!Number.isFinite(price) || price <= 0) return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
      input.price = price;
    }

    const discountedPriceRaw = formData.get("discountedPrice");
    if (discountedPriceRaw !== null) {
      input.discountedPrice = discountedPriceRaw === "" ? null : Number(discountedPriceRaw);
    }

    const discountedMinDaysRaw = formData.get("discountedMinDays");
    if (discountedMinDaysRaw !== null) {
      input.discountedMinDays = discountedMinDaysRaw === "" ? null : Number(discountedMinDaysRaw);
    }

    const insuranceCdwPriceRaw = formData.get("insuranceCdwPrice");
    if (insuranceCdwPriceRaw !== null) {
      input.insuranceCdwPrice = insuranceCdwPriceRaw === "" ? null : Number(insuranceCdwPriceRaw);
    }

    const insuranceReduced800PriceRaw = formData.get("insuranceReduced800Price");
    if (insuranceReduced800PriceRaw !== null) {
      input.insuranceReduced800Price = insuranceReduced800PriceRaw === "" ? null : Number(insuranceReduced800PriceRaw);
    }

    const insuranceReducedPriceRaw = formData.get("insuranceReducedPrice");
    if (insuranceReducedPriceRaw !== null) {
      input.insuranceReducedPrice = insuranceReducedPriceRaw === "" ? null : Number(insuranceReducedPriceRaw);
    }

    const tyreWaiverPriceRaw = formData.get("tyreWaiverPrice");
    if (tyreWaiverPriceRaw !== null) {
      input.tyreWaiverPrice = tyreWaiverPriceRaw === "" ? 15 : Number(tyreWaiverPriceRaw);
    }

    const tyreWaiverBillingRaw = formData.get("tyreWaiverBilling");
    if (tyreWaiverBillingRaw !== null) {
      const billing = String(tyreWaiverBillingRaw).trim();
      if (billing === "" || !isValidTyreWaiverBilling(billing)) {
        input.tyreWaiverBilling = "once";
      } else {
        input.tyreWaiverBilling = billing;
      }
    }

    const acRaw = formData.get("airConditioning");
    const ac = parseBool(acRaw);
    if (ac !== undefined) input.airConditioning = ac;

    const fuelRaw = formData.get("fuelConsumption");
    if (fuelRaw !== null) input.fuelConsumption = String(fuelRaw).trim() || null;

    const featuresRaw = formData.get("features");
    if (featuresRaw !== null) {
      input.features = String(featuresRaw).trim()
        ? String(featuresRaw).split(",").map((f) => f.trim()).filter(Boolean)
        : [];
    }

    const popularRaw = formData.get("popular");
    const popular = parseBool(popularRaw);
    if (popular !== undefined) input.popular = popular;

    const imageFile = formData.get("image");
    if (imageFile instanceof File && imageFile.size > 0) {
      if (imageFile.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Image must be smaller than 5MB" }, { status: 400 });
      input.imagePath = await saveUploadedImage(imageFile);
    }

    const vehicle = await updateVehicle(id, input);
    revalidatePath("/");
    revalidatePath("/vehicles");
    return NextResponse.json({ vehicle });
  } catch (error) {
    console.error("PATCH /api/vehicles/[id]:", error);
    const message = error instanceof Error ? error.message : "Failed to update vehicle";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  ctx: RouteContext<"/api/vehicles/[id]">
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
    if (!id) {
      return NextResponse.json(
        { error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const removed = await removeVehicle(id);
    if (!removed) {
      return NextResponse.json(
        { error: "Vehicle not found" },
        { status: 404 }
      );
    }

    revalidatePath("/");
    revalidatePath("/vehicles");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/vehicles/[id]:", error);
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
