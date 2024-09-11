"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
    const [sellers, setSellers] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [loadingSellers, setLoadingSellers] = useState(false);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                setLoadingSellers(true);
                const { data } = await axios.get(
                    `${process.env.API_URL}/api/sellers`
                );

                setSellers(data.sellers || []);
                setLoadingSellers(false);
            } catch (error) {
                setLoadingSellers(false);
                setError(error?.response?.data?.message);
            }
        };
        fetchSellers();
    }, []);

    const newSeller = async (seller) => {
        try {
            setLoadingSellers(true);
            const { data } = await axios.post(
                `${process.env.API_URL}/api/admin/sellers/new`,
                seller
            );

            if (data) {
                setUpdated(true);
                setSellers((prevSellers) => [...prevSellers, data.seller]);
                setLoadingSellers(false);
                router.replace("/me/admin/sellers");
            }
        } catch (error) {
            setLoadingSellers(false);
            setError(error?.response?.data?.message);
        }
    };

    const updateSeller = async (seller, id) => {
        try {
            setLoadingSellers(true);
            const { data } = await axios.put(
                `${process.env.API_URL}/api/admin/sellers/${id}/update`,
                seller
            );

            if (data) {
                setUpdated(true);
                setSellers((prevSellers) =>
                    prevSellers.map((s) => (s._id === id ? data.seller : s))
                );
                setLoadingSellers(false);
                router.replace(`/me/admin/sellers`);
            }
        } catch (error) {
            setLoadingSellers(false);
            setError(error?.response?.data?.message);
        }
    };

    const deleteSeller = async (id) => {
        try {
            setLoadingSellers(true);
            const { data } = await axios.delete(
                `${process.env.API_URL}/api/admin/sellers/${id}/delete`
            );

            if (data?.success) {
                setUpdated(true);
                setSellers((prevSellers) =>
                    prevSellers.filter((seller) => seller._id !== id)
                );
                setLoadingSellers(false);
                router.refresh();
            }
        } catch (error) {
            setLoadingSellers(false);
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
                loadingSellers,
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
