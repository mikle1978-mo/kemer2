import { dbConnect } from "@/backend/config/dbConnect";
import { newCategory } from "@/backend/controllers/categoryControllers";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await newCategory(req);

    return NextResponse.json(data, { status: 200 });
}
