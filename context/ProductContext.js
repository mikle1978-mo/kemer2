"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [updated, setUpdated] = useState(false);

    const router = useRouter();

    const updateProduct = async (product, id) => {
        try {
            setLoading(true);
            const { data } = await axios.put(
                `${process.env.API_URL}/api/admin/products/${id}/update`,
                product
            );

            if (data) {
                setUpdated(true);
                setLoading(false);
                router.refresh();
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const newProduct = async (product) => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.API_URL}/api/admin/products/new`,
                product
            );

            if (data) {
                setUpdated(true);
                setLoading(false);
                router.back();
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const uploadProductImages = async (formData, id) => {
        try {
            setLoading(true);

            const { data } = await axios.post(
                `${process.env.API_URL}/api/admin/products/${id}/upload_images`,
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
                router.back();
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(
                `${process.env.API_URL}/api/admin/products/${id}/delete`
            );

            if (data?.success) {
                setUpdated(true);
                setLoading(false);
                router.refresh();
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const postReview = async (reviewData) => {
        try {
            setLoading(true);
            const { data } = await axios.put(
                `${process.env.API_URL}/api/products/review`,
                reviewData
            );

            if (data?.success) {
                setUpdated(true);
                setLoading(false);
                router.replace(`/product/${reviewData?.productId}`);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const clearErrors = () => {
        setError(null);
    };

    return (
        <ProductContext.Provider
            value={{
                error,
                loading,
                updated,
                setUpdated,
                newProduct,
                uploadProductImages,
                updateProduct,
                deleteProduct,
                postReview,
                clearErrors,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
