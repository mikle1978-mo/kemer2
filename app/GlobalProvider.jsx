"use client";

import { AdsProvider } from "@/context/AdsContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { SellerProvider } from "@/context/SellerContext";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ children }) {
    return (
        <>
            <ToastContainer position='bottom-right' />
            <SessionProvider>
                <AuthProvider>
                    <CartProvider>
                        <OrderProvider>
                            <SellerProvider>
                                <ProductProvider>
                                    <AdsProvider>
                                        <NavigationProvider>
                                            <CategoryProvider>
                                                {children}
                                            </CategoryProvider>
                                        </NavigationProvider>
                                    </AdsProvider>
                                </ProductProvider>
                            </SellerProvider>
                        </OrderProvider>
                    </CartProvider>
                </AuthProvider>
            </SessionProvider>
        </>
    );
}
