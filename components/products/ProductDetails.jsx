"use client";

import React, { useRef, useContext, useEffect } from "react";
import BreadCrumbs from "../layouts/BreadCrumbs";
import CartContext from "@/context/CartContext";
import NewReview from "../review/NewReview";
import OrderContext from "@/context/OrderContext";
import Reviews from "../review/Reviews";
import { mark } from "@/lib/const/const";
import dynamic from "next/dynamic";
import cl from "./ProductDetails.module.css";
import MyButton from "../UI/myButton/myButton";
import Carousel from "../layouts/carousel/Carousel";

const ProductDetails = ({ product }) => {
    const StarRatings = dynamic(() => import("react-star-ratings"), {
        ssr: false,
    });
    const { addItemToCart } = useContext(CartContext);
    const { canUserReview, canReview } = useContext(OrderContext);

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
            name: `${product?.category}`,
            url: `/?category=${product?.category}`,
        },
    ];

    return (
        <>
            <BreadCrumbs breadCrumbs={breadCrumbs} />
            <Carousel data={product} />

            <div className={cl.grid}>
                <main>
                    <div className={cl.price_wrap}>
                        <p className={cl.price}>
                            {mark}
                            {product?.price}
                        </p>
                        <p className={cl.old_price}>
                            {mark}
                            {(
                                (product?.price * 100) /
                                (100 - product?.discount)
                            ).toFixed(2)}
                        </p>
                    </div>
                    <div className={cl.li_wrap}>
                        <span className={cl.brand_value}>
                            {product?.seller}
                        </span>
                    </div>
                    <h1 className='title'>{product?.name}</h1>

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
                    </div>

                    <ul className={cl.ul_wrap}>
                        {" "}
                        {product?.brand ? (
                            <li className={cl.li_wrap}>
                                {" "}
                                <b className={cl.category}>Производитель:</b>
                                <span className={cl.category_value}>
                                    {product?.brand}
                                </span>
                            </li>
                        ) : (
                            ""
                        )}
                        <li className={cl.li_wrap}>
                            {" "}
                            <b className={cl.category}>Категория:</b>
                            <span className={cl.category_value}>
                                {product?.category}
                            </span>
                        </li>
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
                    </ul>
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
                </main>
            </div>
            {canReview && <NewReview product={product} />}
            <hr />
            <div className={cl.review_wrap}>
                <h3
                    className='title'
                    style={{ marginBottom: "0.5rem", color: "gray" }}
                >
                    Отзывы
                </h3>
                <Reviews reviews={product?.reviews} />
            </div>
        </>
    );
};

export default ProductDetails;
