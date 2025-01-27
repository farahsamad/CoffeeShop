// import { NextRequest, NextResponse } from "next/server";
// import { getUserCartProductsFromDb } from "@/actions/getUserCartProducts";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get("userId");
//   // const { userId }: { userId: string } = await req.json();
//   // console.log("userId in api: ", userId);
//   if (!userId) {
//     return NextResponse.json({ error: "User id is required" }, { status: 400 });
//   }

//   try {
//     const products = await getUserCartProductsFromDb(userId);
//     if (!products) {
//       return NextResponse.json({ error: "Failed to fetch cart products" }, { status: 400 });
//     }
//     return NextResponse.json({ products }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching cart products:", error);
//     return NextResponse.json({ error: "Error fetching cart products" }, { status: 500 });
//   }
// }
