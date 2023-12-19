import { getAdminProducts } from "@/backend/controllers/productControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET(req) {
    dbConnect();

    // Дождитесь завершения аутентификации и проверки ролей
    await isAuthenticatedUser(req);
    await Promise.resolve(authorizeRoles("admin"));

    const data = await getAdminProducts(req);

    return NextResponse.json(data, { status: 200 });
}
