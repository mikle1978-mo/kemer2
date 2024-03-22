"use client";

import AuthContext from "@/context/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import cl from "./UpdateProfile.module.css";
import MyButton from "../UI/myButton/myButton";

const UpdateProfile = () => {
    const {
        user,
        error,
        loading,
        updateProfile,
        clearErrors,
        updated,
        setUpdated,
    } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default.png");

    useEffect(() => {
        if (updated) {
            toast.success("Профиль обновлен");
            setUpdated(false);
        }
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, user]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("image", avatar);

        updateProfile(formData);
    };

    const onChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
            }
        };

        setAvatar(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <>
            <div style={{ maxWidth: "480px" }} className={cl.wrap}>
                <form onSubmit={submitHandler}>
                    <h2 className={cl.title}>Обновить профиль</h2>

                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Имя
                            <input
                                id='name'
                                name='fullname'
                                className={cl.input}
                                type='text'
                                placeholder='Type your name'
                                required
                                autoComplete='off'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Email
                            <input
                                id='email'
                                name='email'
                                autoComplete='off'
                                className={cl.input}
                                type='text'
                                placeholder='Type your email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Аватар
                            <div className={cl.avatar_wrap}>
                                <div className={cl.img_wrap}>
                                    <img
                                        className={cl.img}
                                        src={avatarPreview}
                                    />
                                </div>
                                <div className={cl.img_btn}>
                                    <input
                                        className={cl.img_input}
                                        type='file'
                                        id='formFile'
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    <MyButton type='submit' disabled={loading ? true : false}>
                        {" "}
                        {loading ? "Обновление..." : "Обновить"}
                    </MyButton>
                </form>
            </div>
        </>
    );
};

export default UpdateProfile;
