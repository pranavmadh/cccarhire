import { removeChauffeurCar } from "@/lib/chauffeur-cars";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
