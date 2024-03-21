"use client";

import AuthContext from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import cl from "./UpdateUser.module.css";
import MyButton from "../UI/myButton/myButton";

const UpdateUser = ({ user }) => {
    const { error, updateUser, clearErrors, updated, setUpdated } =
        useContext(AuthContext);

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [role, setRole] = useState(user?.role);
    useEffect(() => {
        if (updated) {
            setUpdated(false);
            toast.success("User Updated");
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("click!!");
        const userData = { name, email, role };

        updateUser(user?._id, userData);
    };

    return (
        <div style={{ maxWidth: "480px" }} className={cl.wrap}>
            <form onSubmit={submitHandler}>
                <h2 className={cl.title}>Обновить пользователя</h2>

                <div className={cl.input_wrap}>
                    <label className={cl.label}>
                        {" "}
                        Имя
                        <input
                            className={cl.input}
                            type='text'
                            placeholder='Имя'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div className={cl.input_wrap}>
                    <label className={cl.label}>
                        {" "}
                        Email
                        <input
                            className={cl.input}
                            type='text'
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div className={cl.input_wrap}>
                    <label className={cl.label}>
                        {" "}
                        Роль
                        <div className={cl.relative}>
                            <select
                                style={{ display: "block" }}
                                className={cl.input}
                                name='category'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                {["user", "admin"].map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                            <i className={cl.arrow}>
                                <svg
                                    width='22'
                                    height='22'
                                    className='fill-current'
                                    viewBox='0 0 20 20'
                                >
                                    <path d='M7 10l5 5 5-5H7z'></path>
                                </svg>
                            </i>
                        </div>
                    </label>
                </div>

                <MyButton type='submit'>Обновить</MyButton>
            </form>
        </div>
    );
};

export default UpdateUser;
