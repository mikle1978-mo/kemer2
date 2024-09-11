import { getProducts } from "@/backend/controllers/productControllers";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";
export const dynamic = "force-dynamic";

export async function GET(req) {
    dbConnect();
    try {
        const { productsCount, filteredProductsCount, products } =
            await getProducts(req);

        return NextResponse.json({
            productsCount,
            filteredProductsCount,
            products,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Ошибка при получении данных" },
            { status: 500 }
        );
    }
}
