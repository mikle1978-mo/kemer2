"use client";

import AuthContext from "@/context/AuthContext";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import cl from "./UpdatePassword.module.css";
import MyButton from "../UI/myButton/myButton";

const UpdatePassword = () => {
    const { error, updatePassword, updated, setUpdated, clearErrors } =
        useContext(AuthContext);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (updated) {
            toast.success("Пароль обновлен");
            setUpdated(false);
        }
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const submitHandler = (e) => {
        e.preventDefault();

        updatePassword({
            currentPassword,
            newPassword,
        });
    };

    return (
        <>
            <div style={{ maxWidth: "480px" }} className={cl.wrap}>
                <form onSubmit={submitHandler}>
                    <h2 className={cl.title}>Изменить пароль</h2>

                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Текущий пароль
                            <input
                                className={cl.input}
                                type='password'
                                placeholder='Type your password'
                                minLength={6}
                                required
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Новый пароль
                            <input
                                className={cl.input}
                                type='password'
                                placeholder='Type your password'
                                minLength={6}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <MyButton type='submit'>Обновить</MyButton>
                </form>
            </div>
        </>
    );
};

export default UpdatePassword;
