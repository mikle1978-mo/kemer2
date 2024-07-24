import { getAddresses } from "@/backend/controllers/addressControllers";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    const data = await getAddresses(req);
    return NextResponse.json(data, { status: 200 });
}
