import { getOrder } from "@/backend/controllers/orderControllers";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

export async function GET(req, { params }) {
    await isAuthenticatedUser(req);
    const data = await getOrder(req, params.id);
    return NextResponse.json(data, { status: 200 });
}
