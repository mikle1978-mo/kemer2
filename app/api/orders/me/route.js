import { dbConnect } from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { myOrders } from "@/backend/controllers/orderControllers";

import { NextResponse } from "next/server";

export async function GET(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    const data = await myOrders(req);

    return NextResponse.json(data, { status: 200 });
}
