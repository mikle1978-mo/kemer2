import { newAds } from "@/backend/controllers/adsControllers";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";

export async function POST(req) {
    dbConnect();

    // Дождитесь завершения аутентификации и проверки ролей
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await newAds(req);

    return NextResponse.json(data, { status: 200 });
}
