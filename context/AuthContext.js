"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [updated, setUpdated] = useState(false);

    const router = useRouter();

    const registerUser = async ({ name, email, password }) => {
        try {
            const { data } = await axios.post(
                `${process.env.API_URL}/api/auth/register`,
                {
                    name,
                    email,
                    password,
                }
            );

            if (data?.user) {
                router.push("/");
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const loadUser = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/auth/session?update");

            if (data?.user) {
                setUser(data.user);
                setLoading(false);
                router.replace("/me");
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const updateProfile = async (formData) => {
        try {
            setLoading(true);

            const { data } = await axios.put(
                `${process.env.API_URL}/api/auth/me/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (data?.user) {
                await loadUser();
                setUpdated(true);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setError(error?.response?.data?.message);
        }
    };

    const updatePassword = async ({ currentPassword, newPassword }) => {
        try {
            const { data } = await axios.put(
                `${process.env.API_URL}/api/auth/me/update_password`,
                {
                    currentPassword,
                    newPassword,
                }
            );
            if (data?.success) {
                setUpdated(true);
                router.replace("/me");
            }
        } catch (error) {
            console.log(error.response);
            setError(error?.response?.data?.message);
        }
    };

    const updateUser = async (id, userData) => {
        try {
            const { data } = await axios.put(
                `${process.env.API_URL}/api/admin/users/${id}/update`,
                {
                    userData,
                }
            );

            if (data?.success) {
                setUpdated(true);
                console.log(
                    "Navigating to:",
                    `${process.env.API_URL}/api/admin/users/${id}/update`
                );
                router.replace(`/admin/users/${id}`);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            const { data } = await axios.delete(
                `${process.env.API_URL}/api/admin/users/${id}/delete`
            );

            if (data?.success) {
                router.replace(`/admin/users`);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const addNewAddress = async (address) => {
        try {
            const { data } = await axios.post(
                `${process.env.API_URL}/api/address/new`,
                address
            );

            if (data) {
                router.push("/me");
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const updateAddress = async (id, address) => {
        try {
            const { data } = await axios.put(
                `${process.env.API_URL}/api/address/${id}/update`,
                address
            );

            if (data?.address) {
                setUpdated(true);
                router.replace(`/address/${id}`);
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const deleteAddress = async (id) => {
        try {
            const { data } = await axios.delete(
                `${process.env.API_URL}/api/address/${id}/delete`
            );

            if (data?.success) {
                router.push("/me");
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const clearErrors = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                error,
                loading,
                updated,
                setUpdated,
                setUser,
                registerUser,
                updateProfile,
                updatePassword,
                updateUser,
                deleteUser,
                addNewAddress,
                updateAddress,
                deleteAddress,
                clearErrors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
