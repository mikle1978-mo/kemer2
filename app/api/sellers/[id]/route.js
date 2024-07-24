import { getSeller } from "@/backend/controllers/sellerControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const data = await getSeller(params.id);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(onError(error, req));
    }
}
