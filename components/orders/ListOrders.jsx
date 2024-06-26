"use client";

import React, { useContext, useEffect } from "react";
import OrderItem from "./OrderItem";
import CartContext from "@/context/CartContext";
import { useSearchParams, useRouter } from "next/navigation";
import cl from "./ListOrders.module.css";

const ListOrders = ({ orders }) => {
    const { clearCart } = useContext(CartContext);
    const params = useSearchParams();
    const router = useRouter();

    const orderSuccess = params.get("order_success");

    useEffect(() => {
        if (orderSuccess === "true") {
            clearCart();
            router.replace("/me/orders");
        }
    }, []);

    return (
        <div className={cl.listOrder}>
            <h3 className='title'>Ваши заказы</h3>
            {orders?.orders?.map((order) => (
                <OrderItem key={order._id} order={order} />
            ))}
        </div>
    );
};

export default ListOrders;
