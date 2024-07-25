import { dbConnect } from "@/backend/config/dbConnect";
import { getCategory } from "@/backend/controllers/categoryControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    dbConnect();
    try {
        const data = await getCategory(params.id);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(onError(error, req));
    }
}
