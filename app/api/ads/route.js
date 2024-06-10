export const dynamic = "force-dynamic";

import { getAllAds } from "@/backend/controllers/adsControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET(req) {
    try {
        dbConnect();
        const data = await getAllAds();

        return NextResponse.json(data);
    } catch (error) {
        // В случае ошибки вызываем middleware для обработки ошибок
        onError(error, req);
    }

    return NextResponse.json(data);
}
