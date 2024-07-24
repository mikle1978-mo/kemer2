import { deleteAddress } from "@/backend/controllers/addressControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/config/dbConnect";

export async function DELETE(req, { params }) {
    dbConnect();
    await isAuthenticatedUser(req);
    try {
        const data = await deleteAddress(req, params.id);

        NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Ошибка при получении данных" },
            { status: 500 }
        );
    }
}
