import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { updateProduct } from "@/backend/controllers/productControllers";

export async function PUT(req, { params }) {
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await updateProduct(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
