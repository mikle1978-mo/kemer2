import {
    authorizeRoles,
    isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { updateUser } from "@/backend/controllers/authControllers";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";

export async function PUT(req, { params }) {
    dbConnect();
    // Дождитесь завершения аутентификации и проверки ролей
    await isAuthenticatedUser(req, { params });
    authorizeRoles(req, "admin");

    const data = await updateUser(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
