"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
import AuthContext from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCartShopping,
    faUser,
    faHouse,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import cl from "./Footer.module.css";

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
        <footer className={cl.footer}>
            <Link href='/'>
                <FontAwesomeIcon icon={faHouse} color='blue' />
            </Link>
            <Link href='/filters'>
                <FontAwesomeIcon icon={faMagnifyingGlass} color='blue' />
            </Link>

            {/* <div className={cl.burger} onClick={clickHandler}>
                <FontAwesomeIcon icon={faMagnifyingGlass} color='blue' />
            </div> */}

            <Link className={cl.cart} href='/cart'>
                {cartItems?.length ? (
                    <>
                        <FontAwesomeIcon icon={faCartShopping} color='blue' />
                        <span className={cl.cartLength}>
                            {cartItems?.length}
                        </span>
                    </>
                ) : (
                    <FontAwesomeIcon icon={faCartShopping} color='blue' />
                )}
            </Link>

            {!user ? (
                <Link href='/login'>
                    <FontAwesomeIcon icon={faUser} color='blue' />
                </Link>
            ) : (
                <Link href='/me'>
                    <div className={cl.me}>
                        <img
                            src={
                                user?.avatar
                                    ? user?.avatar?.url
                                    : "/images/default.png"
                            }
                        />
                    </div>
                </Link>
            )}
            {/* <FontAwesomeIcon icon={faUser} /> */}
        </footer>
    );
};

export default Header;
