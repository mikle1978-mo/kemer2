"use client";

import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import cl from "./Register.module.css";
import MyButton from "../UI/myButton/myButton";

const Register = () => {
    const { error, registerUser, clearErrors } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    const submitHandler = (e) => {
        e.preventDefault();

        registerUser({ name, email, password });
    };

    return (
        <div style={{ maxWidth: "480px" }} className='section'>
            <div style={{ visibility: "hidden" }}>
                <h1 className='hiddenTitle'>
                    Форма регистрации на свйте Кемер-онлайн
                </h1>
            </div>
            <form onSubmit={submitHandler}>
                <h2 className='title'>Зарегистрировать аккаунт</h2>

                <div className={cl.input_wrap}>
                    <label className={cl.input_label}>
                        {" "}
                        Имя
                        <input
                            autoComplete='off'
                            id='name'
                            name='name'
                            className={cl.input}
                            type='text'
                            placeholder='Введите ваше имя'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div className={cl.input_wrap}>
                    <label className={cl.input_label}>
                        {" "}
                        Email
                        <input
                            autoComplete='off'
                            id='email'
                            name='email'
                            className={cl.input}
                            type='text'
                            placeholder='Введите ваш email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div className={cl.input_wrap}>
                    <label className={cl.input_label}>
                        {" "}
                        Пароль
                        <input
                            autoComplete='off'
                            id='password'
                            name='password'
                            className={cl.input}
                            type='password'
                            placeholder='Введите ваш пароль'
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <MyButton type='submit'> Зарегистрировать</MyButton>

                <hr className={cl.hr} />

                <p className={cl.form_bottom}>
                    Уже есть аккаунт?{" "}
                    <Link href='/login' className={cl.form_bottom_link}>
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
