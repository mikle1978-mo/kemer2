import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";

export const AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, NextRequest) {
                try {
                    const { email, password } = credentials;

                    const user = await User.findOne({ email }).select(
                        "+password"
                    );

                    if (!user) {
                        throw new Error("Неверный логин ");
                    }

                    const isPasswordMatched = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!isPasswordMatched) {
                        throw new Error("Неверный пароль");
                    }
                    return user;
                } catch (error) {
                    console.error("Ошибка авторизации:", error.message);
                    throw new Error("Неверный логин или пароль");
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
