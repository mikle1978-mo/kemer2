import Cart from "@/components/cart/Cart";
import React from "react";

export const metadata = {
    title: {
        default: "Корзина",
    },
    description:
        "Ваша корзина в Кемер-онлайн, Анталия, Турция, бесплатная доставка по городу Кемер",
};

const CartPage = () => {
    return <Cart />;
};

export default CartPage;
