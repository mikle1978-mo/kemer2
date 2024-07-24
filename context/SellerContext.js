"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [sellers, setSellers] = useState([]);

    const router = useRouter();

    const updateSeller = async (seller, id) => {
        try {
            setLoading(true);
            const { data } = await axios.put(
                `${process.env.API_URL}/api/admin/sellers/${id}/update`,
                seller
            );

            if (data) {
                setUpdated(true);
                setLoading(false);
                router.replace(`/me/admin/sellers`);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const newSeller = async (seller) => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.API_URL}/api/admin/sellers/new`,
                seller
            );

            if (data) {
                setUpdated(true);
                setLoading(false);
                router.replace("/me/admin/sellers");
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const deleteSeller = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(
                `${process.env.API_URL}/api/admin/sellers/${id}/delete`
            );

            if (data?.success) {
                setUpdated(true);
                setLoading(false);
                router.refresh(`/me/admin/sellers`);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const clearErrors = () => {
        setError(null);
    };

    return (
        <SellerContext.Provider
            value={{
                sellers,
                error,
                loading,
                updated,
                setSellers,
                setUpdated,
                newSeller,
                updateSeller,
                deleteSeller,
                clearErrors,
            }}
        >
            {children}
        </SellerContext.Provider>
    );
};

export default SellerContext;
