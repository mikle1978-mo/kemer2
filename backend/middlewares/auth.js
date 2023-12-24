// middleware на сервере
import { authConfig } from "../config/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

const isAuthenticatedUser = async (req, res) => {
    const session = await getServerSession(authConfig);
    console.log("backend midllewaer session=====", session);
    console.log("backend midllewaer req=====", req);
    if (!session) {
        console.log(
            "Is not session on server middlewaer isAuthentificatedUser!!!!!"
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
