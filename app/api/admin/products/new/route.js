import { dbConnect } from "@/backend/config/dbConnect";
import { newProduct } from "@/backend/controllers/productControllers";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    console.log(req);

    dbConnect();
    await isAuthenticatedUser(req);
    authorizeRoles(req, "admin");

    const data = await newProduct(req);

    return NextResponse.json(data, { status: 200 });
}
