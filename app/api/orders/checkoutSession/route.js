import { dbConnect } from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { checkoutSession } from "@/backend/controllers/orderControllers";
import { NextResponse } from "next/server";

export async function POST(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    const data = await checkoutSession(req);

    return NextResponse.json(data, { status: 200 });
}
