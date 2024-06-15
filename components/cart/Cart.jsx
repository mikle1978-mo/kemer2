"use client";

import React, { useContext } from "react";

import CartContext from "@/context/CartContext";
import { mark } from "@/lib/const/const";
import cl from "./Cart.module.css";
import MyButton from "../UI/myButton/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import CartFooter from "./CartFooter";
import LandingsContact from "../landings/LandingsContact";

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
                        style={{ backgroundColor: "mediumblue" }}
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
                            <div
                                className={cl.item_container}
                                key={cartItem.product}
                            >
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
                                        <figcaption className={cl.figcaption}>
                                            <p>
                                                <a href='#' className={cl.link}>
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
                                        <button
                                            className={cl.button}
                                            data-action='decrement'
                                            onClick={() =>
                                                decreaseQty(cartItem)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>

                                        <div
                                            type='number'
                                            className={cl.number}
                                            name='custom-input-number'
                                            autoComplete='off'
                                            value={cartItem.quantity}
                                            readOnly
                                        >
                                            {cartItem.quantity}
                                        </div>
                                        <button
                                            className={cl.button}
                                            data-action='increment'
                                            onClick={() =>
                                                increaseQty(cartItem)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <div className={cl.price_wrap}>
                                        <small className={cl.quantity_label}>
                                            Цена
                                        </small>
                                        <small className={cl.quantity}>
                                            {" "}
                                            {mark}
                                            {cartItem.price} / за шт{" "}
                                        </small>
                                    </div>
                                    <div className={cl.price_wrap}>
                                        <small className={cl.quantity_label}>
                                            Стоимость
                                        </small>
                                        <p className={cl.quantity}>
                                            {mark}
                                            {(
                                                cartItem.price *
                                                cartItem.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>

                                    <button
                                        className={cl.button}
                                        style={{
                                            color: "black",
                                        }}
                                        onClick={() =>
                                            deleteItemFromCart(
                                                cartItem?.product
                                            )
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
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
                                        шт.
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
                                    style={{
                                        backgroundColor: "var(--primary-4)",
                                        border: "1px solid var(--primary-3)",
                                        color: "black",
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/`;
                                    }}
                                >
                                    Назад
                                </MyButton>
                                <MyButton
                                    style={{ backgroundColor: "blue" }}
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
            <LandingsContact />
        </>
    );
};

export default Cart;
