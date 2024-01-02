import { updatePassword } from "@/backend/controllers/authControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";

export async function PUT(req) {
    try {
        dbConnect();
        await isAuthenticatedUser(req);
        const data = await updatePassword(req);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        // В случае ошибки вызываем middleware для обработки ошибок
        return NextResponse.json({ message: "ошибка сервера" });
    }
}
