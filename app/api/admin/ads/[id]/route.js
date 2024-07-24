import { getAdvertisers } from "@/backend/controllers/adsControllers";
import { NextResponse } from "next/server";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET(req, { params }) {
    dbConnect();

    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await getAdvertisers(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
