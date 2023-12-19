import { deleteAddress } from "@/backend/controllers/addressControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

export async function DELETE(req, { params }) {
    await isAuthenticatedUser(req);
    const data = await deleteAddress(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
