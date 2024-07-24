import { getSeller } from "@/backend/controllers/sellerControllers";
import { NextResponse } from "next/server";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";

export async function GET(req, { params }) {
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await getSeller(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
