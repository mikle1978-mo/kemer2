"use client";

import React, { useContext, useEffect } from "react";
import BreadCrumbs from "../layouts/BreadCrumbs/BreadCrumbs";
import CartContext from "@/context/CartContext";
import NewReview from "../review/NewReview";
import OrderContext from "@/context/OrderContext";
import Reviews from "../review/Reviews";
import { mark } from "@/lib/const/const";
import { useRouter } from "next/navigation";
import cl from "./ProductDetails.module.css";
import MyButton from "../UI/myButton/myButton";
import Carousel from "../layouts/carousel/Carousel";
import { getSlugName } from "@/helpers/helpers";
import StarRating from "../UI/StarRating/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const monthNames = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];
    const month = monthNames[today.getMonth()];
    return `${day} ${month}`;
};

// export const dynamic = "force-dinamic";

const ProductDetails = ({ product }) => {
    const router = useRouter();
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
        { name: "Главная", url: "/" }, // Первая крошка — Главная страница
    ];

    let accumulatedPath = "/catalog/category"; // Переменная для накопления пути

    product.categories.forEach((item) => {
        accumulatedPath += `/${item}`; // Накапливаем путь
        breadCrumbs.push({
            name: getSlugName(item), // Получаем имя для текущего сегмента
            url: accumulatedPath, // Формируем URL для текущего сегмента
        });
    });

    return (
        <>
            <BreadCrumbs breadCrumbs={breadCrumbs} />

            <Carousel data={product} />
            <div className={cl.productDetails}>
                <div className={cl.price_wrap}>
                    <p className={cl.price}>
                        {mark}
                        {product?.price}
                    </p>
                    {product.discount ? (
                        <>
                            <p className={cl.old_price}>
                                {mark}
                                {(
                                    (product?.price * 100) /
                                    (100 - product?.discount)
                                ).toFixed(2)}
                            </p>
                            <p className={cl.discount}>
                                Скидка: {product?.discount}%
                            </p>
                        </>
                    ) : (
                        ""
                    )}
                </div>
                <div className={cl.li_wrap}>
                    <span
                        className={cl.seller_value}
                        onClick={() =>
                            router.push(`/catalog/seller/${product?.sellerId}`)
                        }
                    >
                        {product?.seller}{" "}
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className='icon'
                        />
                    </span>{" "}
                    <div className='ratings'>
                        <StarRating
                            rating={product?.ratings}
                            maxRating={5}
                            size={18}
                            starColor='#ffb829'
                            textColor='black'
                            isInteractive={false} // запрет изменения при наведении
                        />
                    </div>
                </div>

                <h1>{product?.name}</h1>
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
                        <b className={cl.stock}>Склад</b>
                        {inStock ? (
                            <span className={cl.stock_green}>В наличии</span>
                        ) : (
                            <span className={cl.stock_red}>Отсутвует</span>
                        )}
                    </li>
                    <li className={cl.li_wrap}>
                        {product?.articul ? (
                            <>
                                <b className={cl.stock}>Артикул</b>{" "}
                                <span> {product?.articul}</span>
                            </>
                        ) : (
                            ""
                        )}
                    </li>
                </ul>
                <details className={cl.details}>
                    <summary>
                        <h2>Развернуть описание</h2>
                    </summary>

                    <p className={cl.desc}>{product?.description}</p>
                </details>
                <div className={cl.btn_wrap}>
                    <div className={cl.price_wrap}>
                        <p className={cl.price}>
                            {mark}
                            {product?.price}
                        </p>
                        {product.discount ? (
                            <>
                                <p className={cl.old_price}>
                                    {mark}
                                    {(
                                        (product?.price * 100) /
                                        (100 - product?.discount)
                                    ).toFixed(2)}
                                </p>
                                <p className={cl.discount}>
                                    Скидка: {product?.discount}%
                                </p>
                            </>
                        ) : (
                            ""
                        )}
                        <date>{getFormattedDate()}</date>
                    </div>
                    <MyButton onClick={addToCartHandler} disabled={!inStock}>
                        <FontAwesomeIcon
                            icon={faCartShopping}
                            className='icon'
                        />
                    </MyButton>
                </div>
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
