import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { registerUser } from "@/backend/controllers/authControllers";
import { dbConnect } from "@/backend/config/dbConnect";

export async function POST(req) {
    dbConnect();
    const data = await registerUser(req);

    return NextResponse.json(data, { status: 200 });
}
