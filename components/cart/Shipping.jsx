"use client";

import CartContext from "@/context/CartContext";
import OrderContext from "@/context/OrderContext";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import BreadCrumbs from "../layouts/BreadCrumbs";
import cl from "./Shipping.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { mark } from "@/lib/const/const";

const Shipping = ({ addresses }) => {
    const { cart } = useContext(CartContext);
    const { addTempOrderToStore } = useContext(OrderContext);

    const [shippingInfo, setShippinInfo] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const router = useRouter();
    const paymentMethods = [
        {
            _id: 1,
            method: "При получении",
        },
        {
            _id: 2,
            method: "Сразу",
        },
    ];

    const setShippingAddress = (address) => {
        setShippinInfo(address);
    };
    const setMethod = (paymentMethod) => {
        setPaymentMethod(paymentMethod.method);
    };

    const checkoutHandler = async () => {
        if (!shippingInfo) {
            return toast.error("Выберите адрес доставки");
        }
        if (!paymentMethod) {
            return toast.error("Выберите способ оплаты");
        }

        try {
            const { data } = await axios.post(
                `${process.env.API_URL}/api/orders/checkoutSession`,
                {
                    items: cart?.cartItems,
                    checkoutInfo: cart?.checkoutInfo,
                    shippingInfo,
                    paymentMethod,
                }
            );

            addTempOrderToStore(data);
            router.push("/paying");
        } catch (error) {
            console.log(error);
        }
    };

    const breadCrumbs = [
        { name: "Home >", url: "/" },
        { name: "Cart >", url: "/cart" },
        { name: "Order", url: "" },
    ];

    return (
        <div>
            <BreadCrumbs breadCrumbs={breadCrumbs} />
            <section className={cl.section}>
                <div className='container'>
                    <div className={cl.wrap}>
                        <main className={cl.main}>
                            <article className={cl.article}>
                                <h2 className={cl.title}>Адрес доставки</h2>

                                <form>
                                    <fieldset>
                                        <div className={cl.fieldset}>
                                            {addresses?.map((address) => (
                                                <label
                                                    key={address._id}
                                                    className={cl.label}
                                                    onClick={() =>
                                                        setShippingAddress(
                                                            address
                                                        )
                                                    }
                                                >
                                                    <span>
                                                        <input
                                                            id={address._id}
                                                            name='shipping'
                                                            type='radio'
                                                            className={cl.radio}
                                                        />
                                                    </span>
                                                    <p className={cl.info_wrap}>
                                                        <span>
                                                            {address.street}
                                                        </span>
                                                        <small
                                                            className={cl.small}
                                                        >
                                                            {address.city},{" "}
                                                            {address.state},{" "}
                                                            {address.zipCode}
                                                            <br />
                                                            {address.country}
                                                            <br />
                                                            {address.phoneNo}
                                                        </small>
                                                    </p>
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>
                                </form>

                                <Link href='/address/new' className={cl.link}>
                                    <FontAwesomeIcon icon={faPlus} /> Добавить
                                    новый адрес
                                </Link>

                                <h2 className={cl.title}>Способ оплаты</h2>
                                <form>
                                    <fieldset>
                                        <div className={cl.paymentMethod_wrap}>
                                            {paymentMethods?.map(
                                                (paymentMethod) => (
                                                    <label
                                                        key={paymentMethod._id}
                                                        className={
                                                            cl.paymentMethod_label
                                                        }
                                                        onClick={() =>
                                                            setMethod(
                                                                paymentMethod
                                                            )
                                                        }
                                                    >
                                                        <span>
                                                            <input
                                                                id={
                                                                    paymentMethod._id
                                                                }
                                                                name='method'
                                                                type='radio'
                                                                className={
                                                                    cl.radio
                                                                }
                                                            />
                                                        </span>
                                                        <p
                                                            className={
                                                                cl.info_wrap
                                                            }
                                                        >
                                                            <span>
                                                                {
                                                                    paymentMethod.method
                                                                }
                                                            </span>
                                                            <small
                                                                className={
                                                                    cl.small
                                                                }
                                                            ></small>
                                                        </p>
                                                    </label>
                                                )
                                            )}
                                        </div>
                                    </fieldset>
                                </form>

                                <div className={cl.btnlink_wrap}>
                                    <Link
                                        href='/cart'
                                        className={cl.btnlink_back}
                                    >
                                        Назад
                                    </Link>
                                    <a
                                        className={cl.btnlink_forward}
                                        onClick={checkoutHandler}
                                    >
                                        Далее
                                    </a>
                                </div>
                            </article>
                        </main>
                        <aside className={cl.paymentInfo_wrap}>
                            <article
                                className={cl.asaid_article}
                                style={{ maxWidth: "350px" }}
                            >
                                <h2 className={cl.title}>Итого:</h2>
                                <ul>
                                    <li className={cl.paymentInfo_li}>
                                        <span>Стоимость без НДС:</span>
                                        <span>
                                            $
                                            {cart?.checkoutInfo?.amount !==
                                            undefined
                                                ? cart.checkoutInfo.amount.toFixed(
                                                      2
                                                  )
                                                : "N/A"}
                                        </span>
                                    </li>
                                    <li className={cl.paymentInfo_li}>
                                        <span>НДС:</span>
                                        <span>
                                            {mark}
                                            {cart?.checkoutInfo?.tax}
                                        </span>
                                    </li>
                                    <li className={cl.paymentInfo_li_total}>
                                        <span>Стоимость:</span>
                                        <span className={cl.total}>
                                            {mark}
                                            {cart?.checkoutInfo?.totalAmount}
                                        </span>
                                    </li>
                                </ul>

                                <hr className={cl.hr} />

                                <h2 className={cl.title}>Товаров в корзине</h2>

                                {cart?.cartItems?.map((item) => (
                                    <figure
                                        key={item.product}
                                        className={cl.figure}
                                    >
                                        <div>
                                            <div className={cl.img_wrap}>
                                                <img
                                                    width='50'
                                                    height='50'
                                                    src={item.image}
                                                    alt='Title'
                                                />
                                                <span
                                                    className={cl.img_wrap_span}
                                                >
                                                    {item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                        <figcaption className={cl.figcaption}>
                                            <p>{item.name.substring(0, 50)}</p>
                                            <p className={cl.figcaption_total}>
                                                Total: $
                                                {item.quantity * item.price}
                                            </p>
                                        </figcaption>
                                    </figure>
                                ))}
                            </article>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Shipping;
