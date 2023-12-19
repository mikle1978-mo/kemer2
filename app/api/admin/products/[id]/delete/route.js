import { deleteProduct } from "@/backend/controllers/productControllers";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

export async function DELETE(req, { params }) {
    await isAuthenticatedUser(req);
    const data = await deleteProduct(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
