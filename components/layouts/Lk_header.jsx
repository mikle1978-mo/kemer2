"use client";

import { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import AuthContext from "@/context/AuthContext";

import cl from "./Lk_header.module.css";

export default function LkHeader() {
    const { user, setUser } = useContext(AuthContext);

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
                    <h5 className={cl.figcaption_name}>{user?.name}</h5>
                    <p>
                        <b>Email:</b> {user?.email} | <b>Зарегистрирован: </b>
                        {user?.createdAt?.substring(0, 10)}
                    </p>
                </figcaption>
            </figure>

            <hr className='hr' />
        </>
    );
}
