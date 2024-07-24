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
                    <h5 className={cl.figcaption_name}>
                        <p>
                            <b>Пользователь:</b> {user?.name}
                        </p>
                    </h5>
                    <p>
                        <b>Email:</b> {user?.email}
                    </p>
                    <p>
                        <b>Регистрация: </b>
                        {user?.createdAt?.substring(0, 10)}
                    </p>
                    <p>
                        <b>Роль:</b> {user?.role}
                    </p>
                    {user?.role === "seller" && sellerName && (
                        <p>
                            <b>Продавец:</b> <i>{sellerName}</i>
                        </p>
                    )}
                </figcaption>
            </figure>

            <hr className='hr' />
        </>
    );
}
