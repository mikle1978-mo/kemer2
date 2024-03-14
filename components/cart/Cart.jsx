"use client";

import React, { useContext } from "react";

import CartContext from "@/context/CartContext";
import Link from "next/link";
import { mark } from "@/lib/const/const";
import cl from "./Cart.module.css";

const Cart = () => {
    const { addItemToCart, deleteItemFromCart, cart, saveOnCheckout } =
        useContext(CartContext);

    const increaseQty = (cartItem) => {
        const newQty = cartItem?.quantity + 1;
        const item = { ...cartItem, quantity: newQty };

        if (newQty > Number(cartItem.stock)) return;

        addItemToCart(item);
    };

    const decreaseQty = (cartItem) => {
        const newQty = cartItem?.quantity - 1;
        const item = { ...cartItem, quantity: newQty };

        if (newQty <= 0) return;

        addItemToCart(item);
    };

    const amountWithoutTax = cart?.cartItems?.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const taxAmount = (amountWithoutTax * 0.15).toFixed(2);

    const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(
        2
    );

    const checkoutHandler = () => {
        const data = {
            amount: amountWithoutTax,
            tax: taxAmount,
            totalAmount,
        };

        saveOnCheckout(data);
    };

    return (
        <>
            <section className={cl.cart}>
                <div className='container '>
                    <h2 className={cl.cart_title}>
                        Наименований товаров в корзине:{" "}
                        {cart?.cartItems?.length || 0}
                    </h2>
                </div>
            </section>

            {cart?.cartItems?.length > 0 && (
                <section className={cl.cart_items}>
                    <div className='container'>
                        <div className={cl.main_wrap}>
                            <main className={cl.main}>
                                <article className={cl.article}>
                                    {cart?.cartItems?.map((cartItem) => (
                                        <div key={cartItem.product}>
                                            <div className={cl.item_container}>
                                                <div className={cl.item_wrap}>
                                                    <figure
                                                        className={cl.figure}
                                                    >
                                                        <div>
                                                            <div
                                                                className={
                                                                    cl.img_wrap
                                                                }
                                                            >
                                                                <img
                                                                    className={
                                                                        cl.img
                                                                    }
                                                                    src={
                                                                        cartItem.image
                                                                    }
                                                                    alt={
                                                                        cartItem.name
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <figcaption
                                                            className={
                                                                cl.figcaption
                                                            }
                                                        >
                                                            <p>
                                                                <a
                                                                    href='#'
                                                                    className={
                                                                        cl.link
                                                                    }
                                                                >
                                                                    {
                                                                        cartItem.name
                                                                    }
                                                                </a>
                                                            </p>
                                                            <p
                                                                className={
                                                                    cl.link_seller
                                                                }
                                                            >
                                                                {" "}
                                                                Продавец:{" "}
                                                                {
                                                                    cartItem.seller
                                                                }
                                                            </p>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                                <div
                                                    className={
                                                        cl.input_container
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            cl.input_wrap
                                                        }
                                                    >
                                                        <button
                                                            data-action='decrement'
                                                            className={
                                                                cl.btn_minus
                                                            }
                                                            onClick={() =>
                                                                decreaseQty(
                                                                    cartItem
                                                                )
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    cl.minus_plus
                                                                }
                                                            >
                                                                −
                                                            </span>
                                                        </button>
                                                        <input
                                                            type='number'
                                                            className={cl.input}
                                                            name='custom-input-number'
                                                            autoComplete='off'
                                                            value={
                                                                cartItem.quantity
                                                            }
                                                            readOnly
                                                        ></input>
                                                        <button
                                                            data-action='increment'
                                                            className={
                                                                cl.btn_plus
                                                            }
                                                            onClick={() =>
                                                                increaseQty(
                                                                    cartItem
                                                                )
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    cl.minus_plus
                                                                }
                                                            >
                                                                +
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div
                                                        className={
                                                            cl.quantity_wrap
                                                        }
                                                    >
                                                        <p
                                                            className={
                                                                cl.quantity
                                                            }
                                                        >
                                                            {mark}
                                                            {(
                                                                cartItem.price *
                                                                cartItem.quantity
                                                            ).toFixed(2)}
                                                        </p>
                                                        <small
                                                            className={
                                                                cl.quantity_label
                                                            }
                                                        >
                                                            {" "}
                                                            {mark}
                                                            {cartItem.price} /
                                                            за шт{" "}
                                                        </small>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        cl.delete_container
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            cl.delete_wrap
                                                        }
                                                    >
                                                        <a
                                                            className={
                                                                cl.btn_delete
                                                            }
                                                            onClick={() =>
                                                                deleteItemFromCart(
                                                                    cartItem?.product
                                                                )
                                                            }
                                                        >
                                                            Удалить
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className={cl.hr} />
                                        </div>
                                    ))}
                                </article>
                            </main>
                            <aside className={cl.checkInfo_container}>
                                <article className={cl.checkInfo_wrap}>
                                    <ul className={cl.checkInfo_ul}>
                                        <li className={cl.checkInfo_li}>
                                            <span>Стоимость без НДС:</span>
                                            <span>
                                                {mark}
                                                {amountWithoutTax.toFixed(2)}
                                            </span>
                                        </li>
                                        <li className={cl.checkInfo_li}>
                                            <span>Всего шт:</span>
                                            <span
                                                className={
                                                    cl.checkInfo_quantity
                                                }
                                            >
                                                {cart?.cartItems?.reduce(
                                                    (acc, item) =>
                                                        acc + item.quantity,
                                                    0
                                                )}{" "}
                                                (Шт)
                                            </span>
                                        </li>
                                        <li className={cl.checkInfo_li}>
                                            <span>НДС:</span>
                                            <span>
                                                {mark}
                                                {taxAmount}
                                            </span>
                                        </li>
                                        <li className={cl.checkInfo_total}>
                                            <span>Стоимость:</span>
                                            <span>
                                                {mark}
                                                {totalAmount}
                                            </span>
                                        </li>
                                    </ul>

                                    <a
                                        className={cl.checkInfo_bottom}
                                        onClick={checkoutHandler}
                                    >
                                        Продолжить
                                    </a>

                                    <Link href='/' className={cl.btn_back}>
                                        Назад в магазин
                                    </Link>
                                </article>
                            </aside>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Cart;
