"use client";

import SellerContext from "@/context/SellerContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../admin.css";
import MyButton from "../../UI/myButton/myButton";

const UpdateSeller = ({ data }) => {
    const seller = data;
    const { error, updateSeller, clearErrors, updated, setUpdated } =
        useContext(SellerContext);

    const [name, setName] = useState(seller?.name);
    const [email, setEmail] = useState(seller?.email);
    const [phoneNo, setPhoneNo] = useState(seller?.phoneNo);
    const [address, setAddress] = useState(seller?.address);
    useEffect(() => {
        if (updated) {
            setUpdated(false);
            toast.success("Продавец обновлен");
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const submitHandler = (e) => {
        e.preventDefault();
        const sellerData = { name, email, phoneNo, address };

        updateSeller(sellerData, seller._id);
    };

    return (
        <div style={{ maxWidth: "480px" }} className='wrap'>
            <form onSubmit={submitHandler}>
                <h2 className='title'>Обновить пользователя</h2>

                <div className='input_wrap'>
                    <label className='label'>
                        {" "}
                        Имя
                        <input
                            className='input'
                            type='text'
                            placeholder='Имя'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div className='input_wrap'>
                    <label className='label'>
                        {" "}
                        Email
                        <input
                            className='input'
                            type='text'
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='input_wrap'>
                    <label className='label'>
                        {" "}
                        Phone Number
                        <input
                            className='input'
                            type='text'
                            placeholder='phoneNo'
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='input_wrap'>
                    <label className='label'>
                        {" "}
                        Address
                        <input
                            className='input'
                            type='text'
                            placeholder='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <MyButton type='submit'>Обновить</MyButton>
            </form>
        </div>
    );
};

export default UpdateSeller;
