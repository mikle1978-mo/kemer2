import { getAddresses } from "@/backend/controllers/addressControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";

export async function GET(req) {
    await isAuthenticatedUser(req);
    const data = await getAddresses(req);

    return NextResponse.json(data, { status: 200 });
}
