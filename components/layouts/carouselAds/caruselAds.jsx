"use client";

import cl from "./caruselAds.module.css";
import Link from "next/link";
import Image from "next/image";
import { shuffleArray } from "@/helpers/helpers";
import { useState, useEffect } from "react";

export default function CaruselAds({ data }) {
    const advertisers = Array.isArray(data?.advertisers)
        ? data.advertisers
        : [];

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (advertisers.length > 0) {
            setItems(shuffleArray(advertisers));
        } else {
            setItems([]);
        }
    }, [advertisers]);

    // Если data нет, отображаем, например, заглушку или пустое состояние
    if (!data || advertisers.length === 0) {
        return <div>Нет рекламодателей для отображения</div>;
    }

    return (
        <div className={cl.main_container}>
            <div className={cl.window}>
                <div className={cl.all_pages_container}>
                    {items.map((child) => (
                        <Link
                            key={child._id}
                            href={child.siteUrl}
                            className={cl.item}
                            rel='noopener noreferrer'
                            target='_blank'
                            aria-label={child.name}
                        >
                            <Image
                                src={
                                    child?.images[0]
                                        ? child.images[0].url
                                        : "/images/default_product.png"
                                }
                                alt={child.name}
                                width={854}
                                height={480}
                                priority
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
