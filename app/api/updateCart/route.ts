// import { ProductDetails } from "@/components/cart";
// import { updateCartInDb } from "@/data/cart";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { product, userId }: { product: ProductDetails; userId: string } = await req.json();

//   try {
//     const update = await updateCartInDb({ product, userId });
//     if (!update) {
//       return NextResponse.json({ error: "Failed to update cart" }, { status: 400 });
//     }
//     return NextResponse.json({ update }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating cart:", error);
//     return NextResponse.json({ error: "Error updating cart" }, { status: 500 });
//   }
// }
