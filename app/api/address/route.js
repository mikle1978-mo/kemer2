import { getAddresses } from "@/backend/controllers/addressControllers";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

export async function GET(req) {
    await isAuthenticatedUser(req);
    console.log("req------------");
    const data = await getAddresses(req);
    return NextResponse.json(data, { status: 200 });
}
