"use client";

import React, { useContext } from "react";

import CartContext from "@/context/CartContext";
import { mark } from "@/lib/const/const";
import cl from "./Cart.module.css";
import MyButton from "../UI/myButton/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import CartFooter from "./CartFooter";

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
            <div style={{ visibility: "hidden" }}>
                <h1 className='hiddenTitle'>Корзина товаров и продуктов</h1>
            </div>
            {cart?.cartItems?.length ? (
                <h2 className='title'>
                    Наименований товаров: {cart?.cartItems?.length || 0}
                </h2>
            ) : (
                <>
                    <h2 className='title'>В корзине пока пусто</h2>
                    <div className={cl.info}>
                        Взгляните на товары на главной странице и выбирите всё
                        что Вам нравится!
                    </div>
                    <MyButton
                        type='button'
                        style={{ backgroundColor: "green" }}
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/`;
                        }}
                    >
                        На главную
                    </MyButton>
                </>
            )}
            {cart?.cartItems?.length > 0 && (
                <div className='main'>
                    <article className={cl.article}>
                        {cart?.cartItems?.map((cartItem) => (
                            <div key={cartItem.product}>
                                <div className={cl.item_container}>
                                    <div className={cl.top_wrap}>
                                        <figure className={cl.figure}>
                                            <div>
                                                <div className={cl.img_wrap}>
                                                    <img
                                                        className={cl.img}
                                                        src={cartItem.image}
                                                        alt={cartItem.name}
                                                    />
                                                </div>
                                            </div>
                                            <figcaption
                                                className={cl.figcaption}
                                            >
                                                <p>
                                                    <a
                                                        href='#'
                                                        className={cl.link}
                                                    >
                                                        {cartItem.name}
                                                    </a>
                                                </p>
                                                <p className={cl.link_seller}>
                                                    {" "}
                                                    Продавец: {cartItem.seller}
                                                </p>
                                            </figcaption>
                                        </figure>
                                    </div>
                                    <div className={cl.bottom_wrap}>
                                        <div className={cl.quantity_wrap}>
                                            <MyButton
                                                data-action='decrement'
                                                style={{
                                                    backgroundColor: "gray",
                                                    padding: "0.5rem 0.5rem",
                                                }}
                                                onClick={() =>
                                                    decreaseQty(cartItem)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                />
                                            </MyButton>

                                            <input
                                                type='number'
                                                className={cl.input}
                                                name='custom-input-number'
                                                autoComplete='off'
                                                value={cartItem.quantity}
                                                readOnly
                                            ></input>
                                            <MyButton
                                                data-action='increment'
                                                style={{
                                                    backgroundColor: "gray",
                                                    padding: "0.5rem 0.5rem",
                                                }}
                                                onClick={() =>
                                                    increaseQty(cartItem)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                />
                                            </MyButton>
                                        </div>
                                        <div className={cl.price_wrap}>
                                            <div className={cl.price}>
                                                <p className={cl.quantity}>
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
                                                    {cartItem.price} / за шт{" "}
                                                </small>
                                            </div>
                                        </div>
                                        <div>
                                            <MyButton
                                                style={{
                                                    backgroundColor: "red",
                                                }}
                                                onClick={() =>
                                                    deleteItemFromCart(
                                                        cartItem?.product
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </MyButton>
                                        </div>
                                    </div>
                                </div>
                                <hr className={cl.hr} />
                            </div>
                        ))}
                    </article>

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
                                    <span className={cl.checkInfo_quantity}>
                                        {cart?.cartItems?.reduce(
                                            (acc, item) => acc + item.quantity,
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
                            <div className={cl.btn_wrap}>
                                <MyButton
                                    style={{ backgroundColor: "grey" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/`;
                                    }}
                                >
                                    Назад
                                </MyButton>
                                <MyButton
                                    style={{ backgroundColor: "green" }}
                                    onClick={checkoutHandler}
                                >
                                    Продолжить
                                </MyButton>
                            </div>
                        </article>
                    </aside>
                </div>
            )}
            <CartFooter />
        </>
    );
};

export default Cart;
