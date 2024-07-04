"use client";

import AuthContext from "@/context/AuthContext";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import cl from "./page.module.css";

const Sidebar = () => {
    const { user } = useContext(AuthContext);

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
                                href='/admin/products/new'
                                className={cl.sideBar_link}
                            >
                                Новый продукт{" "}
                                <span className={cl.admin}>(Admin)</span>
                            </Link>
                        </li>
                        <li className={cl.li}>
                            <Link
                                href='/admin/products'
                                className={cl.sideBar_link}
                            >
                                Все продукты{" "}
                                <span className={cl.admin}>(Admin)</span>
                            </Link>
                        </li>
                        <li className={cl.li}>
                            <Link
                                href='/admin/orders'
                                className={cl.sideBar_link}
                            >
                                Все заказы{" "}
                                <span className={cl.admin}>(Admin)</span>
                            </Link>
                        </li>
                        <li className={cl.li}>
                            <Link
                                href='/admin/users'
                                className={cl.sideBar_link}
                            >
                                Все пользователи{" "}
                                <span className={cl.admin}>(Admin)</span>
                            </Link>
                        </li>
                        <li className={cl.li}>
                            <Link href='/admin/ads' className={cl.sideBar_link}>
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
                                href='/admin/products/new'
                                className={cl.sideBar_link}
                            >
                                Новый продукт{" "}
                                <span className={cl.admin}>(Seller)</span>
                            </Link>
                        </li>
                        <li className={cl.li}>
                            <Link
                                href='/admin/products'
                                className={cl.sideBar_link}
                            >
                                Все продукты{" "}
                                <span className={cl.admin}>(Seller)</span>
                            </Link>
                        </li>
                        {/* <li className={cl.li}>
                            <Link
                                href='/admin/orders'
                                className={cl.sideBar_link}
                            >
                                Все заказы{" "}
                                <span className={cl.admin}>(Seller)</span>
                            </Link>
                        </li> */}

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
};

export default Sidebar;
