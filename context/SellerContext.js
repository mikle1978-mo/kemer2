"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
    const [sellers, setSellers] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `${process.env.API_URL}/api/sellers`
                );
                setSellers(data.sellers);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error?.response?.data?.message);
            }
        };
        fetchSellers();
    }, []);

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
            setLoading(false);
            setError(error?.response?.data?.message);
        }
    };

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
            setLoading(false);
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
                router.refresh();
            }
        } catch (error) {
            setLoading(false);
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