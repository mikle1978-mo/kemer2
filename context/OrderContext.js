"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [tempOrder, setTempOrder] = useState({});
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [canReview, setCanReview] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setTempOrderToState();
    }, []);

    const setTempOrderToState = () => {
        setTempOrder(
            sessionStorage.getItem("tempOrder")
                ? JSON.parse(sessionStorage.getItem("tempOrder"))
                : {}
        );
    };

    const addTempOrderToStore = async (order) => {
        sessionStorage.setItem("tempOrder", JSON.stringify(order));
        setTempOrderToState();
    };

    const updateOrder = async (id, orderData) => {
        try {
            const { data } = await axios.put(
                `${process.env.API_URL}/api/admin/orders/${id}/update`,
                orderData
            );

            if (data.success) {
                setUpdated(true);
                router.replace(`/admin/orders/${id}`);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const deleteOrder = async (id) => {
        try {
            const { data } = await axios.delete(
                `${process.env.API_URL}/api/admin/orders/${id}/delete`
            );

            if (data?.success) {
                router.replace(`/admin/orders`);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const canUserReview = async (id) => {
        try {
            const { data } = await axios.get(
                `${process.env.API_URL}/api/orders/can_review?productId=${id}`
            );

            if (data?.canReview) {
                setCanReview(data?.canReview);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const clearErrors = () => {
        setError(null);
    };

    return (
        <OrderContext.Provider
            value={{
                tempOrder,
                error,
                updated,
                canReview,
                addTempOrderToStore,
                setUpdated,
                updateOrder,
                deleteOrder,
                canUserReview,
                clearErrors,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContext;
