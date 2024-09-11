import { dbConnect } from "@/backend/config/dbConnect";
import { getProductsByCategory } from "@/backend/controllers/productControllers";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    dbConnect();
    const { slug } = params;

    try {
        const products = await getProductsByCategory(slug);
        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500 });
    }
}
