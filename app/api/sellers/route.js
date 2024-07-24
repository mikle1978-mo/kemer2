import { dbConnect } from "@/backend/config/dbConnect";
import { getSellers } from "@/backend/controllers/sellerControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";

export async function GET(req) {
    dbConnect();
    try {
        const sellers = await getSellers();

        return NextResponse.json({
            sellers,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Ошибка при получении данных" },
            { status: 500 }
        );
    }
}
