import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { updateSeller } from "@/backend/controllers/sellerControllers";
import { dbConnect } from "@/backend/config/dbConnect";

export async function PUT(req, { params }) {
    dbConnect()
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await updateSeller(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
