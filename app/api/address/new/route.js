import { dbConnect } from "@/backend/config/dbConnect";
import { newAddress } from "@/backend/controllers/addressControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";

export async function POST(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    const data = await newAddress(req);
    return NextResponse.json(data, { status: 200 });
}
