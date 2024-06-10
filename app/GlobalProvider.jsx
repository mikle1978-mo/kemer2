"use client";

import { AdsProvider } from "@/context/AdsContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";
import { SessionProvider } from "next-auth/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ children }) {
    return (
        <>
            <ToastContainer position='bottom-right' />
            <AuthProvider>
                <CartProvider>
                    <OrderProvider>
                        <ProductProvider>
                            <AdsProvider>
                                <SessionProvider>{children}</SessionProvider>
                            </AdsProvider>
                        </ProductProvider>
                    </OrderProvider>
                </CartProvider>
            </AuthProvider>
        </>
    );
}
