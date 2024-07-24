import {
    authorizeRoles,
    isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { updateUser } from "@/backend/controllers/authControllers";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    // Дождитесь завершения аутентификации и проверки ролей
    await isAuthenticatedUser(req, { params });
    authorizeRoles(req, "admin");

    const data = await updateUser(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
