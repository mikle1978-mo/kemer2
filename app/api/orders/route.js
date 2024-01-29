import { getOrders } from "@/backend/controllers/orderControllers";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

export async function GET(req) {
    await isAuthenticatedUser(req);
    console.log("req------------");
    const data = await getOrders(req);
    return NextResponse.json(data, { status: 200 });
}
