import {
    authorizeRoles,
    isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { getUser } from "@/backend/controllers/authControllers";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET(req, { params }) {
    dbConnect();

    // Дождитесь завершения аутентификации и проверки ролей
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await getUser(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
