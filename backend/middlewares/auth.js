// middleware на сервере
import { AuthOptions } from "../config/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

const isAuthenticatedUser = async (req, res) => {
    const session = await getServerSession(AuthOptions);

    if (!session) {
        console.log(
            "There is no session in middleware isAuthentificatedUser!!!!!"
        );
        return NextResponse.redirect(new URL("/login", req.url));
    }
    req.user = session.user;

    return NextResponse.next();
};

const authorizeRoles = (req, ...roles) => {
    if (!roles.includes(req.user?.role)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
};

export { isAuthenticatedUser, authorizeRoles };
