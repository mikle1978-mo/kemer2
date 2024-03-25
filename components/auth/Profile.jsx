"use client";

import React, { useContext } from "react";
import UserAddresses from "../user/UserAddresses";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import cl from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MyButton from "../UI/myButton/myButton";

const Profile = ({ addresses }) => {
    const { user } = useContext(AuthContext);

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

            <UserAddresses addresses={addresses} />

            <Link href='/address/new'>
                <MyButton>
                    <FontAwesomeIcon icon={faPlus} className={cl.icon} />
                    Добавить новый адрес
                </MyButton>
            </Link>

            <hr className={cl.hr} />
        </>
    );
};

export default Profile;
