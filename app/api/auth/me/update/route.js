import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";
import { updateProfile } from "@/backend/controllers/authControllers";

export async function PUT(req) {
    try {
        dbConnect();
        await isAuthenticatedUser(req);
        const data = await updateProfile(req);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        // В случае ошибки вызываем middleware для обработки ошибок
        return NextResponse.json({ message: "ошибка сервера" });
    }
}
