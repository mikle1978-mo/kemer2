import { newSeller } from "@/backend/controllers/sellerControllers";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await newSeller(req);

    return NextResponse.json(data, { status: 200 });
}
