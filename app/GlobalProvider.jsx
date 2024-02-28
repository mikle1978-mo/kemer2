"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";
import { MenuProvider } from "@/context/MenuContext";
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
                            <MenuProvider>
                                <SessionProvider>{children}</SessionProvider>
                            </MenuProvider>
                        </ProductProvider>
                    </OrderProvider>
                </CartProvider>
            </AuthProvider>
        </>
    );
}
