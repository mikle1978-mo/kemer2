import { getServerSession } from "next-auth/next";
import { authConfig } from "../config/auth";
import { NextResponse } from "next/server";

const isAuthenticatedUser = async (req, res, next) => {
    const data = await getServerSession(authConfig);

    if (!data) {
        return NextResponse.redirect(new URL("/login", req.url)); // Пример пути перенаправления
    }
    req.user = data.user;

    return NextResponse.next();
};

const authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        await isAuthenticatedUser(req); // Дождитесь завершения аутентификации
        if (!roles.includes(req.user?.role)) {
            return NextResponse.redirect(new URL("/login", req.url)); // Пример пути перенаправления
        }
        return NextResponse.next();
    };
};

export { isAuthenticatedUser, authorizeRoles };
