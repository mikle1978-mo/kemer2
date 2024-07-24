import { getAdvertisers } from "@/backend/controllers/adsControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET(req) {
    dbConnect();
    try {
        const data = await getAdvertisers(req);

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Ошибка при получении данных" },
            { status: 500 }
        );
    }
}
