"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { parseCallbackUrl } from "@/helpers/helpers";
import cl from "./Login.module.css";
import MyButton from "../UI/myButton/myButton";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    // const params = useSearchParams();
    // const callBackUrl = params.get("callbackUrl");

    const submitHandler = async (e) => {
        e.preventDefault();

        const data = await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
        });

        if (data?.error) {
            toast.error(data?.error);
        }

        if (data?.ok) {
            router.push("/");
        }
    };

    return (
        <div style={{ maxWidth: "480px" }} className={cl.login}>
            <form onSubmit={submitHandler}>
                <h2 className={cl.login_title}>Вход</h2>

                <div className={cl.wrap}>
                    <label className={cl.label}>
                        {" "}
                        Email
                        <input
                            id='email'
                            name='email'
                            className={cl.input}
                            type='text'
                            placeholder='Type your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete='off'
                        />
                    </label>
                </div>

                <div className={cl.wrap}>
                    <label className={cl.label}>
                        {" "}
                        Password
                        <input
                            id='password'
                            name='password'
                            className={cl.input}
                            type='password'
                            placeholder='Type your password'
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete='off'
                        />
                    </label>
                </div>

                <MyButton type='submit'>Войти</MyButton>

                <hr className={cl.hr} />

                <p className={cl.reg_label}>
                    У вас аккаунта?{" "}
                    <Link href='/register' className={cl.reg_link}>
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
