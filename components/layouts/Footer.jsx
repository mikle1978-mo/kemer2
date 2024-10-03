"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import CartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import AuthContext from "@/context/AuthContext";
import NavigationContext from "@/context/NavigationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faUser,
    faHouse,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer = () => {
    const { user, setUser } = useContext(AuthContext);
    const { open, setOpen } = useContext(NavigationContext);
    const pathname = usePathname() || "";
    const isActiveHome = pathname === "/";
    const isActiveCart = pathname.includes("/cart");
    const isActiveFilters = pathname.includes("/filters");
    const isActiveMe = pathname.includes("/me");
    const isActiveLogin = pathname.includes("/login");

    const { data } = useSession();

    useEffect(() => {
        if (data) {
            setUser(data?.user);
        }
    }, [data]);

    const { cart } = useContext(CartContext);
    const cartItems = cart?.cartItems;

    return (
        <footer className='footer'>
            <Link
                href='/'
                className={isActiveHome ? "active" : "links"}
                onClick={() => setOpen(false)}
                aria-label='На главную страницу'
            >
                <FontAwesomeIcon icon={faHouse} />
                <span>домой</span>
            </Link>
            <p
                className={open ? "active" : "links"}
                onClick={() => setOpen(!open)}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span>категории</span>
            </p>

            <Link
                href='/cart'
                className={isActiveCart ? " cart active" : " cart links"}
                onClick={() => setOpen(false)}
                aria-label='В корзину'
            >
                {cartItems?.length ? (
                    <>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span>корзина</span>
                        <p className='cartLength'>{cartItems?.length}</p>
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span>корзина</span>
                    </>
                )}
            </Link>

            {!user ? (
                <Link
                    href='/login'
                    className={isActiveLogin ? "active" : "links"}
                    onClick={() => setOpen(false)}
                    aria-label='Войти'
                >
                    <FontAwesomeIcon icon={faUser} />
                    <span>войти</span>
                </Link>
            ) : (
                <Link href='/me' aria-label='В личный кабинет'>
                    <div className='me'>
                        <img
                            src={
                                user?.avatar
                                    ? user?.avatar?.url
                                    : "/images/default.png"
                            }
                        />
                    </div>
                    <span>кабинет</span>
                </Link>
            )}
        </footer>
    );
};

export default Footer;
