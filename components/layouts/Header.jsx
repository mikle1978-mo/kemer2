"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import Search from "./Search";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
import AuthContext from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCartShopping,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import cl from "./Header.module.css";

const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    const { data } = useSession();

    useEffect(() => {
        if (data) {
            setUser(data?.user);
        }
    }, [data]);

    const { cart } = useContext(CartContext);
    const cartItems = cart?.cartItems;

    return (
        <header className={cl.header}>
            <div className='container'>
                <div className={cl.line}>
                    <Link className={cl.logo} href='/'>
                        KEMER-ONLINE
                    </Link>
                    <Search name={"header"} />
                    <div className={cl.left}>
                        <Link href='/cart' className={cl.cart}>
                            {cartItems?.length ? (
                                <>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <span className={cl.cart_label}>
                                        {cartItems?.length}
                                    </span>
                                </>
                            ) : (
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    color='blue'
                                />
                            )}
                        </Link>
                        {!user ? (
                            <Link href='/login' className={cl.login}>
                                <FontAwesomeIcon icon={faUser} />
                                <span className={cl.login_btn}>Войти</span>
                            </Link>
                        ) : (
                            <Link href='/me'>
                                <div className={cl.user}>
                                    <img
                                        className={cl.meImg}
                                        src={
                                            user?.avatar
                                                ? user?.avatar?.url
                                                : "/images/default.png"
                                        }
                                    />
                                    <div className={cl.user_info}>
                                        <p>
                                            {user?.name}
                                            <time className={cl.user_name}>
                                                {user?.email}
                                            </time>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
