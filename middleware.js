import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        // authorize roles
        const url = req.nextUrl.pathname;
        const userRole = req?.nextauth?.token?.user?.role;

        if (url.startsWith("/api")) {
            NextResponse.next().headers.append(
                "Access-Control-Allow-Origin",
                "*"
            );
        }
        if (url?.startsWith("/admin") && userRole !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                if (!token) {
                    return false;
                }
                return true;
            },
            async jwt(token, user) {
                if (token) {
                    return token;
                } else {
                    console.error("JWT Token is missing");
                }
            },

            async session(session, user) {
                if (session) {
                    return session;
                } else {
                    console.error("Session is missing");
                }
            },
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/me/:path*", "/shipping"],
};
