"use client";

import Image from "next/image";
import MyModal from "@/components/UI/myButton/myModal";
import { useState } from "react";
import cl from "./ImageWrapper.module.css";

export default function ImageWrapper({ child }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    return (
        <>
            <div className={cl.card__image}>
                <Image
                    onClick={toggleOpen}
                    width={768}
                    height={1000}
                    src={
                        child?.url ? child?.url : "/images/default_product.png"
                    }
                    alt='фото товара'
                />
            </div>{" "}
            <MyModal isOpen={isOpen} toggleOpen={toggleOpen}>
                <div className={cl.card__image}>
                    <Image
                        width={768}
                        height={1000}
                        src={
                            child?.url
                                ? child?.url
                                : "/images/default_product.png"
                        }
                        alt='фото товара'
                    />
                </div>
            </MyModal>
        </>
    );
}
