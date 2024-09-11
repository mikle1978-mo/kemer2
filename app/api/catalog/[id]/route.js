import { dbConnect } from "@/backend/config/dbConnect";
import { getProductById } from "@/backend/controllers/productControllers";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!");

    dbConnect();
    const { id } = params;
    try {
        const product = await getProductById(id);
        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Ошибка при получении продукта" },
            { status: 500 }
        );
    }
}
