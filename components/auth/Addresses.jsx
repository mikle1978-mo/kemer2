"use client";

import UserAddresses from "../user/UserAddresses";
import Link from "next/link";
import cl from "./Addresses.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MyButton from "../UI/myButton/myButton";

const Addresses = ({ addresses }) => {
    return (
        <>
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

export default Addresses;
