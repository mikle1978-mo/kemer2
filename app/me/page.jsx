"use client";

import AuthContext from "@/context/AuthContext";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import cl from "./page.module.css";

export default function PageMe() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user !== undefined) {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <p>Loading...</p>; // Или другой индикатор загрузки
    }

    if (!user) {
        return <p>Пользователь не найден</p>;
    }

    const logoutHandler = () => {
        signOut();
    };

    return (
        <aside className={cl.userMenu_active}>
            <ul className='sidebar'>
                {user?.role === "admin" && (
                    <>
                        <li className={cl.li}>
                            <Link
                                href='/me/admin/sellers'
                                className={cl.sideBar_link}
                            >
                                Все продавцы{" "}
                                <span className={cl.admin}>(Admin)</span>
                            </Link>
                        </li>
                        <li className={cl.li}>
                            <Link
                                href='/me/admin/products'
                                className={cl.sideBar_link}
                            >
                                Все продукты{" "}
                                <span className={cl.admin}>(Admin)</span>
                            </Link>
                        </li>
                        <li className={cl.li}>
                            <Link
                                href='/me/admin/categories'
                                className={cl.sideBar_link}
                            >
                                Все категории{" "}
                                <span className={cl.admin}>(Admin)</span>
                            </Link>
                        </li>
                        <li className={cl.li}>
                            <Link
                                href='/me/admin/orders'
                                className={cl.sideBar_link}
                            >
                                Все заказы{" "}
                                <span className={cl.admin}>(Admin)</span>
                            </Link>
                        </li>
                        <li className={cl.li}>
                            <Link
                                href='/me/admin/users'
                                className={cl.sideBar_link}
                            >
                                Все пользователи{" "}
                                <span className={cl.admin}>(Admin)</span>
                            </Link>
                        </li>
                        <li className={cl.li}>
                            <Link
                                href='/me/admin/ads'
                                className={cl.sideBar_link}
                            >
                                Реклама{" "}
                                <span className={cl.admin}>(Admin)</span>
                            </Link>
                        </li>
                        <hr />
                    </>
                )}
                {user?.role === "seller" && (
                    <>
                        <li className={cl.li}>
                            <Link
                                href={`/me/admin/products/seller/${user?.sellerId}`}
                                className={cl.sideBar_link}
                            >
                                Все продукты{" "}
                                <span className={cl.admin}>(Seller)</span>
                            </Link>
                        </li>
                        <hr />
                    </>
                )}

                <li className={cl.li}>
                    <Link href='/me/addresses' className={cl.sideBar_link}>
                        Адреса
                    </Link>
                </li>
                <li className={cl.li}>
                    <Link href='/me/orders' className={cl.sideBar_link}>
                        Заказы
                    </Link>
                </li>
                <li className={cl.li}>
                    <Link href='/me/update' className={cl.sideBar_link}>
                        Обновить профиль
                    </Link>
                </li>
                <li className={cl.li}>
                    <Link
                        href='/me/update_password'
                        className={cl.sideBar_link}
                    >
                        Обновить пароль
                    </Link>
                </li>
                <li className={cl.li}>
                    <a className={cl.btn_exit} onClick={logoutHandler}>
                        Выйти
                    </a>
                </li>
            </ul>
        </aside>
    );
}
