import { updatePassword } from "@/backend/controllers/authControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { NextResponse } from "next/server";

export async function PUT(req) {
    dbConnect();

    // Дождитесь завершения аутентификации и проверки ролей
    await isAuthenticatedUser(req);
    await Promise.resolve(authorizeRoles("admin"));

    const data = await updatePassword(req);

    return NextResponse.json(data, { status: 200 });
}
