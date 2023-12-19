import {
    authorizeRoles,
    isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { getUser } from "@/backend/controllers/authControllers";
import { NextResponse } from "next/server";

export async function GET(req) {
    dbConnect();

    // Дождитесь завершения аутентификации и проверки ролей
    await isAuthenticatedUser(req);
    await Promise.resolve(authorizeRoles("admin"));

    const data = await getUser(req);

    return NextResponse.json(data, { status: 200 });
}
