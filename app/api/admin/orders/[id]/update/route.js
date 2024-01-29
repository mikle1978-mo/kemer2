import { dbConnect } from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { updateOrder } from "@/backend/controllers/orderControllers";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    dbConnect();
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await updateOrder(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
