import { deleteProduct } from "@/backend/controllers/productControllers";
import { NextResponse } from "next/server";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";

export async function DELETE(req, { params }) {
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");
    const data = await deleteProduct(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
