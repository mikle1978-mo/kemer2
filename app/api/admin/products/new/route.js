import { newProduct } from "@/backend/controllers/productControllers";
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
    await Promise.resolve(authorizeRoles("admin"));

    const data = await newProduct(req);

    return NextResponse.json(data, { status: 200 });
}
