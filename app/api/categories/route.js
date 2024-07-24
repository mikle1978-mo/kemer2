import { dbConnect } from "@/backend/config/dbConnect";
import { getCategories } from "@/backend/controllers/categoryControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";

export async function GET(req) {
    dbConnect();
    try {
        const data = await getCategories(req);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        onError(error, req);
        return NextResponse.json(
            { status: 500 },
            { error: "Ошибка при обработке запроса" }
        );
    }
}
