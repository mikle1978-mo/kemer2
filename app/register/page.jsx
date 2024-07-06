import Register from "@/components/auth/Register";
import React from "react";

export const metadata = {
    title: {
        default: "Страница регистрации ",
    },
    description:
        "Страница регистрации в личного кабинета Кемер-онлайн. Ввод логина, пароля и имени",
    alternates: {
        canonical: `${process.env.API_URL}/register`,
    },
};

const RegisterPage = () => {
    return <Register />;
};

export default RegisterPage;
