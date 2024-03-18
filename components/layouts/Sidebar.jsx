"use client";

import AuthContext from "@/context/AuthContext";
import MenuContext from "@/context/MenuContext";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import cl from "./Sidebar.module.css";

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const { isActiveMenu, toggleMenuMode } = useContext(MenuContext);

    const logoutHandler = () => {
        signOut();
    };

    return (
        <aside className={isActiveMenu ? cl.userMenu_active : cl.userMenu}>
            <div className='container'>
                <h1 className={cl.title}>Меню</h1>
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
                            <hr />
                        </>
                    )}

                    <li className={cl.li}>
                        <Link href='/me' className={cl.sideBar_link}>
                            Ваш профиль
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
            </div>
        </aside>
    );
};

export default Sidebar;
