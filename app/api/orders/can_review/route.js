// import nc from "next-connect";
// import dbConnect from "@/backend/config/dbConnect";
// import onError from "@/backend/middlewares/errors";
// import { isAuthenticatedUser } from "@/backend/middlewares/auth";
// import { canReview } from "@/backend/controllers/orderControllers";

// const handler = nc({ onError });

// dbConnect();

// handler.use(isAuthenticatedUser).get(canReview);

// export default handler;

import { canReview } from "@/backend/controllers/orderControllers";
import { NextResponse } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { requestToBodyStream } from "next/dist/server/body-streams";

export async function GET(req, { params }) {
    await isAuthenticatedUser(req);
    const data = await canReview(req);
    console.log(data);
    return NextResponse.json(data, { status: 200 });
}
