"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import CartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import AuthContext from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faUser,
    faHouse,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Header = () => {
    const { user, setUser } = useContext(AuthContext);
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
            <Link href='/' className={isActiveHome ? "active" : "links"}>
                <FontAwesomeIcon icon={faHouse} />
            </Link>
            <Link
                href='/filters'
                className={isActiveFilters ? "active" : "links"}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>

            <Link
                href='/cart'
                className={isActiveCart ? " cart active" : " cart links"}
            >
                {cartItems?.length ? (
                    <>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span className='cartLength'>{cartItems?.length}</span>
                    </>
                ) : (
                    <FontAwesomeIcon icon={faCartShopping} />
                )}
            </Link>

            {!user ? (
                <Link
                    href='/login'
                    className={isActiveLogin ? "active" : "links"}
                >
                    <FontAwesomeIcon icon={faUser} />
                </Link>
            ) : (
                <Link href='/me'>
                    <div className='me'>
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
        </footer>
    );
};

export default Header;
