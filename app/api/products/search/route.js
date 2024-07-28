import { getProducts } from "@/backend/controllers/productControllers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    try {
        const { products, productsCount, filteredProductsCount } =
            await getProducts(queryParams);
        return NextResponse.json({
            products,
            productsCount,
            filteredProductsCount,
        });
    } catch (error) {
        console.error("Error searching products:", error);
        return NextResponse.json(
            { message: "Error searching products" },
            { status: 500 }
        );
    }
}
