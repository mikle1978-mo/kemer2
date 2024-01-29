import { dbConnect } from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { getOrder } from "@/backend/controllers/orderControllers";
import { NextResponse } from "next/server";

export async function GET(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await getOrder(req);

    return NextResponse.json(data, { status: 200 });
}
