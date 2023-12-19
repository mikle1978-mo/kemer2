import { getServerSession } from "next-auth/next";
import { authConfig } from "../config/auth";
import { NextResponse } from "next/server";

const isAuthenticatedUser = async (req, res, next) => {
    const data = await getServerSession(authConfig);

    req.user = data.user;

    return NextResponse.next();
};

const authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        await isAuthenticatedUser(req); // Дождитесь завершения аутентификации

        return NextResponse.next();
    };
};

export { isAuthenticatedUser, authorizeRoles };
