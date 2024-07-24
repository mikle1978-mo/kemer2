"use client";

import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import SellerContext from "@/context/SellerContext";

import "../admin.css";
import MyButton from "../../UI/myButton/myButton";

const NewSeller = () => {
    const { newSeller, updated, setUpdated, loading, error } =
        useContext(SellerContext);
    if (!newSeller && !updated && !setUpdated && !error) {
        throw new Error(" components  NewSeller ошибка контекста");
    }

    const [seller, setSeller] = useState({
        name: "",
        email: "",
        phoneNo: "",
        address: "",
    });

    useEffect(() => {
        if (updated) {
            toast.success("Продавец создан");
            setUpdated(false);
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated, setUpdated]);

    const onChange = (e) => {
        setSeller({ ...seller, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        newSeller(seller);
    };

    return (
        <>
            <h1 className='title'>Создать нового продавца</h1>

            <form className='form' onSubmit={submitHandler}>
                <div className='input_wrap'>
                    <label className='label'>
                        Наименование
                        <input
                            id='name'
                            type='text'
                            className='input'
                            placeholder='Seller name'
                            autoComplete='off'
                            name='name'
                            value={seller.name}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>
                <div className='input_wrap_bottom'>
                    <div className='input_wrap'>
                        <label className='label'>
                            email
                            <div className='relative'>
                                <div className='input_price_cont'>
                                    <input
                                        id='price'
                                        type='text'
                                        className='input'
                                        placeholder='email'
                                        autoComplete='off'
                                        name='email'
                                        value={seller.email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className='input_wrap'>
                        <label className='label'>
                            Phone Number
                            <div className='relative'>
                                <div className='input_price_cont'>
                                    <input
                                        id='phoneNo'
                                        type='text'
                                        className='input'
                                        placeholder='PhoneNo'
                                        autoComplete='off'
                                        name='phoneNo'
                                        value={seller.phoneNo}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className='input_seller_cont'>
                    <div className='input_wrap'>
                        <label className='label'>
                            Address
                            <input
                                id='address'
                                type='text'
                                className='input'
                                placeholder='address'
                                autoComplete='off'
                                name='address'
                                value={seller.address}
                                onChange={onChange}
                                required
                            />
                        </label>
                    </div>
                </div>
                <MyButton type='submit' disabled={loading}>
                    {loading ? "Создание..." : "Создать продавца"}
                </MyButton>
            </form>
        </>
    );
};

export default NewSeller;
