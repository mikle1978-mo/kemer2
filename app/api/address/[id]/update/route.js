import { updateAddress } from "@/backend/controllers/addressControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

export async function PUT(req, { params }) {
    await isAuthenticatedUser(req);
    const data = await updateAddress(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
