import { dbConnect } from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { getAllAds } from "@/backend/controllers/adsControllers";
import { NextResponse } from "next/server";

export async function GET(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await getAllAds();

    return NextResponse.json(data, { status: 200 });
}
