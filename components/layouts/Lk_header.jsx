"use client";

import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import SellerContext from "@/context/SellerContext";
import axios from "axios";

import cl from "./Lk_header.module.css";

export default function LkHeader() {
    const { user } = useContext(AuthContext);
    const { setSellers } = useContext(SellerContext);
    const [sellerName, setSellerName] = useState("");

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const { data } = await axios.get("/api/sellers");

                setSellers(data.sellers);
            } catch (error) {
                console.error("Ошибка при запросе продавцов", error);
            }
        };

        fetchSellers();
    }, [setSellers]);

    useEffect(() => {
        const fetchSellerName = async () => {
            if (user?.sellerId) {
                try {
                    const { data } = await axios.get(
                        `/api/sellers/${user.sellerId}`
                    );
                    setSellerName(data.seller.name);
                } catch (error) {
                    console.error("Ошибка при запросе продавца", error);
                }
            }
        };

        fetchSellerName();
    }, [user?.sellerId]);

    return (
        <>
            <figure className={cl.figure}>
                <div className={cl.img_wrap}>
                    <img
                        className={cl.img}
                        src={
                            user?.avatar
                                ? user?.avatar?.url
                                : "/images/default.png"
                        }
                        alt={user?.name}
                    />
                </div>
                <figcaption className={cl.figcaption}>
                    <p>
                        <span>Пользователь:</span> {user?.name}
                    </p>
                    {/* <p>
                        <span>Email:</span> {user?.email}
                    </p> */}
                    <p>
                        <span>Регистрация: </span>
                        {user?.createdAt?.substring(0, 10)}
                    </p>
                    <p>
                        <span>Роль:</span> {user?.role}
                    </p>
                    {user?.role === "seller" && sellerName && (
                        <p>
                            <span>Продавец:</span> <i>{sellerName}</i>
                        </p>
                    )}
                </figcaption>
            </figure>

            <hr />
        </>
    );
}
