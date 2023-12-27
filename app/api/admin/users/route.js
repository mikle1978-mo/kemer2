import { getUsers } from "@/backend/controllers/authControllers";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET(req) {
    dbConnect();
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await getUsers(req);

    return NextResponse.json(data, { status: 200 });
}
