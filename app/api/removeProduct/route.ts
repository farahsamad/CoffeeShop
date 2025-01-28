import { removeProductFromCartFromDb } from "@/data/cart";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productId, userId }: { productId: string; userId: string } = await req.json();

  try {
    const update = await removeProductFromCartFromDb({ productId, userId });
    if (!update) {
      return NextResponse.json({ error: "Failed to update cart" }, { status: 400 });
    }
    if (update === "Product not found") {
      return NextResponse.json({ error: "Product not found!" }, { status: 400 });
    }
    return NextResponse.json({ update }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating cart" }, { status: 500 });
  }
}
