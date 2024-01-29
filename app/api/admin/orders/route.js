import { dbConnect } from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { getOrders } from "@/backend/controllers/orderControllers";
import { NextResponse } from "next/server";

export async function GET(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await getOrders(req);

    console.log("admin/orders/route: data", data);

    return NextResponse.json(data, { status: 200 });
}
