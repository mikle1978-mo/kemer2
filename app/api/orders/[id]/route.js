import { getOrder } from "@/backend/controllers/orderControllers";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET(req, { params }) {
    dbConnect();
    await isAuthenticatedUser(req);
    const data = await getOrder(req, params.id);
    return NextResponse.json(data, { status: 200 });
}
