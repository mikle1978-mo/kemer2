import { getProductsBySeller } from "@/backend/controllers/productControllers";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { sellerId } = params;
    try {
        const products = await getProductsBySeller(sellerId);
        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500 });
    }
}
