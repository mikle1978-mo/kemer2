import { getAdminSellers } from "@/backend/controllers/sellerControllers";
import { NextResponse } from "next/server";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");
    const data = await getAdminSellers(req);

    return NextResponse.json(data, { status: 200 });
}
