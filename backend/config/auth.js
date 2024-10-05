import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";

export const AuthOptions = {
    // Конфигурация для работы с JWT
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 дней в секундах
    },
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
                        throw new Error("Неверный логин");
                    }

                    const isPasswordMatched = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!isPasswordMatched) {
                        throw new Error("Неверный пароль");
                    }

                    // Возвращаем пользователя
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
            console.log(1111);

            if (user) {
                token.user = user;

                // Добавляем sellerId, если у пользователя есть эта роль и sellerId
                if (user.role === "seller" && user.sellerId) {
                    token.user.sellerId = user.sellerId;
                }
            }

            // Обновляем пользователя в токене, чтобы включить возможные изменения
            const updatedUser = await User.findById(token.user._id);
            if (updatedUser) {
                token.user = updatedUser;
            }

            return token;
        },
        session: async ({ session, token }) => {
            console.log(2222);

            session.user = token.user;

            // Удаляем пароль из сессии
            delete session?.user?.password;

            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    cookies: {
        sessionToken: {
            name: `__Secure-next-auth.session-token`, // Имя куки
            options: {
                httpOnly: true, // Запретить доступ к куке через JavaScript
                sameSite: "lax", // Защита от CSRF-атак
                path: "/", // Путь для куки
                secure: process.env.NODE_ENV === "production", // Использовать secure флаг в продакшене
                maxAge: 30 * 24 * 60 * 60, // Устанавливаем срок действия куки (30 дней)
            },
        },
        csrfToken: {
            name: `__Secure-next-auth.csrf-token`, // Имя куки для CSRF токена
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                maxAge: 30 * 24 * 60 * 60, // Устанавливаем срок действия куки (30 дней)
            },
        },
    },
};
