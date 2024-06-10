"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const AdsContext = createContext();

export const AdsProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [updated, setUpdated] = useState(false);

    const router = useRouter();

    const newAds = async (ads) => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.API_URL}/api/admin/ads/new`,
                ads
            );

            if (data) {
                setUpdated(true);
                setLoading(false);
                router.replace("/admin/ads");
            }
        } catch (error) {
            setLoading(false);
            setError(error?.response?.data?.message);
        }
    };

    const updateAds = async (ads, id) => {
        try {
            setLoading(true);
            const { data } = await axios.put(
                `${process.env.API_URL}/api/admin/ads/${id}/update`,
                ads
            );

            if (data) {
                setUpdated(true);
                setLoading(false);
                router.replace(`/admin/ads/${id}`);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const uploadAdsImages = async (formData, id) => {
        try {
            setLoading(true);

            const { data } = await axios.post(
                `${process.env.API_URL}/api/admin/ads/${id}/upload_images`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data?.data) {
                setUpdated(true);
                setLoading(false);
                router.replace("/admin/ads");
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const deleteAds = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(
                `${process.env.API_URL}/api/admin/ads/${id}/delete`
            );

            if (data?.success) {
                setUpdated(true);
                setLoading(false);
                router.replace(`/admin/ads`);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const clearErrors = () => {
        setError(null);
    };

    return (
        <AdsContext.Provider
            value={{
                error,
                loading,
                updated,
                setUpdated,
                newAds,
                uploadAdsImages,
                updateAds,
                deleteAds,
                clearErrors,
            }}
        >
            {children}
        </AdsContext.Provider>
    );
};

export default AdsContext;
