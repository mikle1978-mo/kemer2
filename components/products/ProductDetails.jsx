"use client";

import React, { useRef, useContext, useEffect } from "react";
import BreadCrumbs from "../layouts/BreadCrumbs";
import CartContext from "@/context/CartContext";
import NewReview from "../review/NewReview";
import OrderContext from "@/context/OrderContext";
import Reviews from "../review/Reviews";
import { mark } from "@/lib/const/const";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import cl from "./ProductDetails.module.css";
import MyButton from "../UI/myButton/myButton";

const ProductDetails = ({ product }) => {
    const StarRatings = dynamic(() => import("react-star-ratings"), {
        ssr: false,
    });
    const { addItemToCart } = useContext(CartContext);
    const { canUserReview, canReview } = useContext(OrderContext);
    const imgRef = useRef(null);
    const setImgPreview = (url) => {
        imgRef.current.src = url;
    };

    useEffect(() => {
        canUserReview(product?._id);
    }, []);

    const inStock = product?.stock >= 1;

    const addToCartHandler = () => {
        addItemToCart({
            product: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0].url,
            stock: product.stock,
            seller: product.seller,
        });
    };

    const breadCrumbs = [
        { name: "Home", url: "/" },
        {
            name: `${product?.name?.substring(0, 100)} ...`,
            url: `/products/${product?._id}`,
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
                                product?.images[0]
                                    ? product?.images[0].url
                                    : "/images/default_product.png"
                            }
                            alt={product?.name}
                            // width={340}
                            // height={340}
                        />
                    </div>
                    <div className={cl.smlImgWrap}>
                        {product?.images?.map((img) => (
                            <a
                                key={img?._id}
                                className={cl.asideImgLink}
                                onClick={() => setImgPreview(img?.url)}
                            >
                                <img
                                    className={cl.smlImage}
                                    src={img.url}
                                    alt={product?.name}
                                    // width="500"
                                    // height="500"
                                />
                            </a>
                        ))}
                    </div>
                </aside>
                <main>
                    <h2 className={cl.main_title}>{product?.name}</h2>

                    <div className={cl.main_wrap}>
                        <div className='ratings'>
                            <StarRatings
                                rating={product?.ratings}
                                starRatedColor='#ffb829'
                                numberOfStars={5}
                                starDimension='18px'
                                starSpacing='1px'
                                name={`rating-${product?._id}`}
                            />
                        </div>
                        <span className={cl.rating}>{product?.ratings}</span>

                        <svg
                            width='6px'
                            height='6px'
                            viewBox='0 0 6 6'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <circle cx='3' cy='3' r='3' fill='#DBDBDB' />
                        </svg>

                        <span className={cl.verified}>Verified</span>
                    </div>

                    <p className={cl.price}>
                        {mark}
                        {product?.price}
                    </p>
                    <details className={cl.details}>
                        <summary>Развернуть описание</summary>

                        <p className={cl.desc}>{product?.description}</p>
                    </details>

                    <div className={cl.btn_wrap}>
                        <MyButton
                            onClick={addToCartHandler}
                            disabled={!inStock}
                        >
                            {/* <i className='fa fa-shopping-cart mr-2'></i> */}
                            В корзину
                        </MyButton>
                    </div>

                    <ul className={cl.ul_wrap}>
                        <li className={cl.li_wrap}>
                            {" "}
                            <b className={cl.stock}>Склад</b>
                            {inStock ? (
                                <span className={cl.stock_green}>
                                    В наличии
                                </span>
                            ) : (
                                <span className={cl.stock_red}>Отсутвует</span>
                            )}
                        </li>
                        <li className={cl.li_wrap}>
                            {" "}
                            <b className={cl.category}>Категория:</b>
                            <span className={cl.category_value}>
                                {product?.category}
                            </span>
                        </li>
                        <li className={cl.li_wrap}>
                            {" "}
                            <b className={cl.brand}>Продавец/Бренд:</b>
                            <span className={cl.brand_value}>
                                {product?.seller}
                            </span>
                        </li>
                    </ul>
                </main>
            </div>

            {canReview && <NewReview product={product} />}
            <hr />

            <div className={cl.review_wrap}>
                <h3
                    className={cl.review_title}
                    style={{ marginBottom: "0.5rem" }}
                >
                    Отзывы
                </h3>
                <Reviews reviews={product?.reviews} />
            </div>
        </>
    );
};

export default ProductDetails;
