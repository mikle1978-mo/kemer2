"use client";

import React, { useRef } from "react";
import BreadCrumbs from "../layouts/BreadCrumbs";

import { mark } from "@/lib/const/const";
import cl from "./AdsDetails.module.css";
import MyButton from "../UI/myButton/myButton";

const adsDetails = ({ ads }) => {
    const imgRef = useRef(null);
    const setImgPreview = (url) => {
        imgRef.current.src = url;
    };

    const addToCartHandler = () => {
        addItemToCart({
            ads: ads._id,
            name: ads.name,
            price: ads.price,
            image: ads.images[0].url,
            stock: ads.stock,
            seller: ads.seller,
        });
    };

    const breadCrumbs = [
        { name: "Home", url: "/" },
        {
            name: `${ads?.advertiser}`,
            url: `*`,
        },
    ];

    return (
        <>
            <BreadCrumbs breadCrumbs={breadCrumbs} />
            <div className={cl.grid}>
                <aside className={cl.aside}>
                    <div className={cl.imgWrap}>
                        <img
                            ref={imgRef}
                            className={cl.aside_img}
                            src={
                                ads?.images[0]
                                    ? ads?.images[0].url
                                    : "/images/default_product.png"
                            }
                            alt={ads?.name}
                            // width={340}
                            // height={340}
                        />
                    </div>
                    <div className={cl.smlImgWrap}>
                        {ads?.images?.map((img) => (
                            <a
                                key={img?._id}
                                className={cl.asideImgLink}
                                onClick={() => setImgPreview(img?.url)}
                            >
                                <img
                                    className={cl.smlImage}
                                    src={img.url}
                                    alt={ads?.name}
                                    // width="500"
                                    // height="500"
                                />
                            </a>
                        ))}
                    </div>
                </aside>
                <main>
                    <h1 className={cl.main_title}>{ads?.name}</h1>

                    <p className={cl.desc}>{ads?.description}</p>
                    <a
                        href={`tel:${ads.contactPhone}`}
                        target='_blank'
                        className={cl.btn_wrap}
                    >
                        Позвонить
                    </a>
                    <div className={cl.btn_wrap}></div>
                </main>
            </div>
        </>
    );
};

export default adsDetails;
