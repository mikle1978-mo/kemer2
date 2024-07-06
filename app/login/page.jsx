import Login from "@/components/auth/Login";

export const metadata = {
    title: {
        default: "Страница входа в личный кабинет Кемер-онлайн",
    },
    description:
        "Страница входа в личный кабинет Кемер-онлайн. Ввод логина и пароля",
    alternates: {
        canonical: `${process.env.API_URL}/login`,
    },
};

const LoginPage = () => {
    return <Login />;
};

export default LoginPage;
