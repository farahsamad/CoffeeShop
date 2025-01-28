import { getProducts } from "@/data/product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await getProducts();
    if (products) {
      return NextResponse.json({ products }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Products not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
