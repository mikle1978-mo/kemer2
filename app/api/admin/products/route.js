import { getAdminProducts } from "@/backend/controllers/productControllers";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";

export async function GET(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");
    const data = await getAdminProducts(req);

    return NextResponse.json(data, { status: 200 });
}
