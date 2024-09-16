"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const addItemToCart = ({
        product,
        name,
        price,
        image,
        stock,
        seller,
        quantity = 1,
    }) => {
        const item = { product, name, price, image, stock, seller, quantity };

        const isItemExist = cart?.cartItems?.find(
            (i) => i.product === item.product
        );

        let newCartItems;
        if (isItemExist) {
            newCartItems = cart?.cartItems?.map((i) =>
                i.product === isItemExist.product ? item : i
            );
        } else {
            newCartItems = [...(cart?.cartItems || []), item];
        }

        const newCart = { cartItems: newCartItems };
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
    };

    const deleteItemFromCart = (id) => {
        const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);
        const newCart = { cartItems: newCartItems };

        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
    };

    const saveOnCheckout = ({ amount }) => {
        const checkoutInfo = { amount };
        const newCart = { ...cart, checkoutInfo };

        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
        router.push("/shipping");
    };

    const clearCart = () => {
        localStorage.removeItem("cart");
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addItemToCart,
                saveOnCheckout,
                deleteItemFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
