import { addVehicle, getAllVehicles, saveUploadedImage } from "@/lib/vehicles";
import type { Transmission, TyreWaiverBilling, VehicleCategory } from "@/lib/types/vehicle";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const vehicles = await getAllVehicles();
    return NextResponse.json({ vehicles });
  } catch (error) {
    console.error("GET /api/vehicles:", error);
    return NextResponse.json(
      { error: "Failed to load vehicles" },
      { status: 500 }
    );
  }
}

function parseBool(value: FormDataEntryValue | null): boolean {
  if (value === null) return false;
  const s = String(value).toLowerCase();
  return s === "true" || s === "1" || s === "on" || s === "yes";
}

function isValidCategory(value: string): value is VehicleCategory {
  return value === "suv" || value === "hatchback" || value === "compact";
}

function isValidTransmission(value: string): value is Transmission {
  return value === "Automatic" || value === "Manual";
}

function isValidTyreWaiverBilling(value: string): value is TyreWaiverBilling {
  return value === "daily" || value === "once";
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
    const type = String(formData.get("type") ?? "").trim();
    const category = String(formData.get("category") ?? "");
    const modelYearRaw = formData.get("modelYear");
    const modelYear =
      modelYearRaw === null || modelYearRaw === ""
        ? undefined
        : Number(modelYearRaw);
    const seats = Number(formData.get("seats"));
    const luggageRaw = formData.get("luggage");
    const luggage =
      luggageRaw === null || luggageRaw === "" ? undefined : Number(luggageRaw);
    const transmission = String(formData.get("transmission") ?? "");
    const price = Number(formData.get("price"));
    const discountedPriceRaw = formData.get("discountedPrice");
    const discountedPrice =
      discountedPriceRaw === null || discountedPriceRaw === ""
        ? undefined
        : Number(discountedPriceRaw);
    const discountedMinDaysRaw = formData.get("discountedMinDays");
    const discountedMinDays =
      discountedMinDaysRaw === null || discountedMinDaysRaw === ""
        ? undefined
        : Number(discountedMinDaysRaw);
    const insuranceCdwPriceRaw = formData.get("insuranceCdwPrice");
    const insuranceCdwPrice =
      insuranceCdwPriceRaw === null || insuranceCdwPriceRaw === ""
        ? undefined
        : Number(insuranceCdwPriceRaw);
    const insuranceReduced800PriceRaw = formData.get("insuranceReduced800Price");
    const insuranceReduced800Price =
      insuranceReduced800PriceRaw === null || insuranceReduced800PriceRaw === ""
        ? undefined
        : Number(insuranceReduced800PriceRaw);
    const insuranceReducedPriceRaw = formData.get("insuranceReducedPrice");
    const insuranceReducedPrice =
      insuranceReducedPriceRaw === null || insuranceReducedPriceRaw === ""
        ? undefined
        : Number(insuranceReducedPriceRaw);
    const tyreWaiverPriceRaw = formData.get("tyreWaiverPrice");
    const tyreWaiverPrice =
      tyreWaiverPriceRaw === null || tyreWaiverPriceRaw === ""
        ? 15
        : Number(tyreWaiverPriceRaw);
    const tyreWaiverBillingRaw = String(formData.get("tyreWaiverBilling") ?? "").trim();
    const tyreWaiverBilling = isValidTyreWaiverBilling(tyreWaiverBillingRaw)
      ? tyreWaiverBillingRaw
      : "once";
    const airConditioning = parseBool(formData.get("airConditioning"));
    const fuelConsumption = String(formData.get("fuelConsumption") ?? "").trim();
    const featuresRaw = String(formData.get("features") ?? "").trim();
    const features = featuresRaw
      ? featuresRaw
          .split(",")
          .map((part) => part.trim())
          .filter(Boolean)
      : undefined;
    const popular = parseBool(formData.get("popular"));
    const imageFile = formData.get("image");

    if (!name || !type) {
      return NextResponse.json(
        { error: "Name and vehicle type are required" },
        { status: 400 }
      );
    }

    if (!isValidCategory(category)) {
      return NextResponse.json(
        { error: "Category must be suv, hatchback, or compact" },
        { status: 400 }
      );
    }

    if (!isValidTransmission(transmission)) {
      return NextResponse.json(
        { error: "Transmission must be Automatic or Manual" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(seats) || seats < 2 || seats > 9) {
      return NextResponse.json(
        { error: "Seats must be between 2 and 9" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number" },
        { status: 400 }
      );
    }
    if (
      modelYear !== undefined &&
      (!Number.isFinite(modelYear) || modelYear < 2010 || modelYear > 2100)
    ) {
      return NextResponse.json(
        { error: "Model year must be between 2010 and 2100" },
        { status: 400 }
      );
    }
    if (
      luggage !== undefined &&
      (!Number.isFinite(luggage) || luggage < 0 || luggage > 10)
    ) {
      return NextResponse.json(
        { error: "Luggage must be between 0 and 10" },
        { status: 400 }
      );
    }
    if (
      discountedPrice !== undefined &&
      (!Number.isFinite(discountedPrice) || discountedPrice <= 0 || discountedPrice >= price)
    ) {
      return NextResponse.json(
        { error: "Discounted price must be positive and lower than the daily price" },
        { status: 400 }
      );
    }
    if (
      discountedMinDays !== undefined &&
      (!Number.isFinite(discountedMinDays) || discountedMinDays < 2 || discountedMinDays > 30)
    ) {
      return NextResponse.json(
        { error: "Discount days must be between 2 and 30" },
        { status: 400 }
      );
    }

    if (!(imageFile instanceof File) || imageFile.size === 0) {
      return NextResponse.json(
        { error: "Vehicle image is required" },
        { status: 400 }
      );
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be smaller than 5MB" },
        { status: 400 }
      );
    }

    const imagePath = await saveUploadedImage(imageFile);

    const vehicle = await addVehicle({
      name,
      type,
      category,
      modelYear,
      seats,
      luggage,
      transmission,
      airConditioning,
      fuelConsumption: fuelConsumption || undefined,
      features,
      price,
      discountedPrice,
      discountedMinDays,
      insuranceCdwPrice,
      insuranceReduced800Price,
      insuranceReducedPrice,
      tyreWaiverPrice,
      tyreWaiverBilling,
      popular,
      imagePath,
    });

    revalidatePath("/");
    revalidatePath("/vehicles");
    return NextResponse.json({ vehicle }, { status: 201 });
  } catch (error) {
    console.error("POST /api/vehicles:", error);
    const message =
      error instanceof Error ? error.message : "Failed to add vehicle";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
