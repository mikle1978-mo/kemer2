"use client";

import React, { useRef, useContext, useEffect, useState } from "react";
import BreadCrumbs from "../layouts/BreadCrumbs";
import NewReview from "../review/NewReview";
import OrderContext from "@/context/OrderContext";
import Reviews from "../review/Reviews";
import { mark } from "@/lib/const/const";
import dynamic from "next/dynamic";
import cl from "./ServiceDetails.module.css";
import MyButton from "../UI/myButton/myButton";
import TGMessage from "@/backend/utils/tgMessage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";

const ProductDetails = ({ product }) => {
    const StarRatings = dynamic(() => import("react-star-ratings"), {
        ssr: false,
    });
    const router = useRouter();
    const { canUserReview, canReview } = useContext(OrderContext);
    const { user } = useContext(AuthContext);
    const imgRef = useRef(null);
    const setImgPreview = (url) => {
        imgRef.current.src = url;
    };
    const [shippingInfo, setShippingInfo] = useState({
        phoneNo: "",
    });
    console.log(shippingInfo);
    useEffect(() => {
        canUserReview(product?._id);
    }, []);

    const { phoneNo } = shippingInfo;

    const onChange = (e) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value,
        });
    };

    const addToCartHandler = () => {
        const order = {
            user: user,
            shippingInfo: shippingInfo,
            orderItems: [
                {
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0].url,
                    stock: product.stock,
                    seller: product.seller,
                },
            ],
        };
        TGMessage(order);
        toast.success("Заявка отправлена");
        router.push("/congratulation");
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
                    </div>

                    <p className={cl.price}>
                        от {mark}
                        {product?.price}
                    </p>

                    <p className={cl.desc}>{product?.description}</p>

                    <label className={cl.label}>
                        <div className={cl.relative}>
                            <div className={cl.input_price_cont}>
                                <input
                                    id='phoneNo'
                                    type='text'
                                    className={cl.input}
                                    placeholder='номер телефона для связи'
                                    autoComplete='off'
                                    name='phoneNo'
                                    value={phoneNo}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </label>

                    <div className={cl.btn_wrap}>
                        {shippingInfo.phoneNo ? (
                            <MyButton onClick={addToCartHandler}>
                                Заказать обратный звонок
                            </MyButton>
                        ) : (
                            <MyButton onClick={addToCartHandler} disabled>
                                Заказать обратный звонок
                            </MyButton>
                        )}
                    </div>
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
