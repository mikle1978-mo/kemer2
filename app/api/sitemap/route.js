import { getSitemap } from "@/backend/controllers/productControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET() {
    try {
        dbConnect(); // Установка соединения с базой данных
        const data = await getSitemap();

        return NextResponse.json(data);
    } catch (error) {
        // Обработка ошибок с помощью middleware для ошибок
        onError(error, req);
        return NextResponse.json({ error: "Ошибка при обработке запроса" });
    }
}
