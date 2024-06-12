import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { getAllAds } from "@/backend/controllers/adsControllers";

export async function GET(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");
    const data = await getAllAds(req);

    return NextResponse.json(data, { status: 200 });
}
