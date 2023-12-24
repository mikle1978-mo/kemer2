import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/backend/config/dbConnect";

export const AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, NextRequest) {
                try {
                    // ваш текущий код
                    dbConnect();
                    const { email, password } = credentials;

                    const user = await User.findOne({ email }).select(
                        "+password"
                    );

                    if (!user) {
                        throw new Error("Invalid Email or Password");
                    }

                    const isPasswordMatched = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!isPasswordMatched) {
                        throw new Error("Invalid Email or Password");
                    }
                    return user;
                } catch (error) {
                    console.error("Authorization Error:", error.message);
                    throw new Error("Invalid Email or Password");
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);

            const updatedUser = await User.findById(token.user._id);
            token.user = updatedUser;

            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            console.log("authoptions/cb-session:-------", session.user);

            // delete password from session
            delete session?.user?.password;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
