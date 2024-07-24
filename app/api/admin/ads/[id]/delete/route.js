import { deleteCategory } from "@/backend/controllers/categoryControllers";
import { NextResponse } from "next/server";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/config/dbConnect";

export async function DELETE(req, { params }) {
    dbConnect();
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");
    const data = await deleteCategory(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
