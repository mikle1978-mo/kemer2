"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(false);

    const router = useRouter();

    const newCategory = async (category) => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.API_URL}/api/admin/categories/new`,
                {
                    ...category,
                    parent: category.parent || null, // Ensure parent is null if empty
                }
            );

            if (data) {
                setUpdated(true);
                setLoading(false);
                router.replace("/admin/categories");
            }
        } catch (error) {
            setLoading(false);
            setError(error?.response?.data?.message);
        }
    };

    const updateCategory = async (category, id) => {
        try {
            setLoading(true);
            const { data } = await axios.put(
                `${process.env.API_URL}/api/admin/categories/${id}/update`,
                category
            );

            if (data) {
                setUpdated(true);
                setLoading(false);
                router.replace(`/admin/categories`);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const deleteCategory = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(
                `${process.env.API_URL}/api/admin/categories/${id}/delete`
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

    const clearErrors = () => {
        setError(null);
    };

    return (
        <CategoryContext.Provider
            value={{
                categories,
                error,
                loading,
                updated,

                setCategories,
                setUpdated,
                newCategory,
                updateCategory,
                deleteCategory,
                clearErrors,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryContext;
