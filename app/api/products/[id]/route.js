import { getProduct } from "@/backend/controllers/productControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET(req, { params }) {
    dbConnect();
    const data = await getProduct(req, params.id);

    return NextResponse.json(data, { status: 200 });
}
