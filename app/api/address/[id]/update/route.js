import { updateAddress } from "@/backend/controllers/addressControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/config/dbConnect";

export async function PUT(req, { params }) {
    dbConnect();
    await isAuthenticatedUser(req);
    const data = await updateAddress(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
