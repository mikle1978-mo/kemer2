import { getAddress } from "@/backend/controllers/addressControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/config/dbConnect";

export async function GET(req, { params }) {
    dbConnect();
    await isAuthenticatedUser(req);
    const data = await getAddress(req, params.id);

    return NextResponse.json(data, { status: 200 });
}

// import nc from "next-connect";
// import dbConnect from "@/backend/config/dbConnect";
// import {
//     deleteAddress,
//     getAddress,
//     updateAddress,
// } from "@/backend/controllers/addressControllers";
// import { isAuthenticatedUser } from "@/backend/middlewares/auth";

// import onError from "@/backend/middlewares/errors";

// const handler = nc({ onError });

// dbConnect();

// handler.use(isAuthenticatedUser).get(getAddress);
// handler.use(isAuthenticatedUser).put(updateAddress);
// handler.use(isAuthenticatedUser).delete(deleteAddress);

// export default handler;
