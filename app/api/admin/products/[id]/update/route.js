import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { updateProduct } from "@/backend/controllers/productControllers";
import { dbConnect } from "@/backend/config/dbConnect";

export async function PUT(req, { params }) {
    dbConnect();
    await isAuthenticatedUser(req);
    await Promise.resolve(authorizeRoles("admin"));
    const data = await updateProduct(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
