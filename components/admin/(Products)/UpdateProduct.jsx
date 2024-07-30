"use client";

import ProductContext from "@/context/ProductContext";
import CategoryContext from "@/context/CategoryContext";
import SellerContext from "@/context/SellerContext";
import AuthContext from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import cl from "./UpdateProduct.module.css";
import MyButton from "../../UI/myButton/myButton";
import { useRouter } from "next/navigation";
import { byField } from "@/helpers/helpers";
import BackButton from "@/components/UI/myButton/backButton";

const UpdateProduct = ({ data }) => {
    const { user } = useContext(AuthContext);

    const { updateProduct, error, updated, setUpdated, clearErrors } =
        useContext(ProductContext);
    const { categories } = useContext(CategoryContext);
    const { sellers } = useContext(SellerContext);

    const router = useRouter();

    const [product, setProduct] = useState({
        name: data?.name,
        description: data?.description,
        sellerId: data?.sellerId,
        brand: data?.brand,
        price: data?.price,
        discount: data?.discount,
        deliveryTime: data?.deliveryTime,
        stock: data?.stock,
        categoryId: data?.categoryId,
    });

    useEffect(() => {
        if (updated) {
            toast.success("Продукт обновлен");
            setUpdated(false);
            user?.role === "seller"
                ? router.push(`/me/admin/products/seller/${user?.sellerId}`)
                : router.push("/me/admin/products");
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const {
        name,
        description,
        sellerId,
        brand,
        price,
        discount,
        deliveryTime,
        stock,
        categoryId,
    } = product;

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        updateProduct(product, data?._id);
    };

    return (
        <>
            <div className={cl.top_row}>
                <BackButton />
                <h1 className='title'>Обновление продукта</h1>
            </div>

            <form onSubmit={submitHandler}>
                <div className={cl.input_wrap}>
                    <label className={cl.label}>
                        {" "}
                        Наименование
                        <input
                            type='text'
                            className={cl.input}
                            placeholder='Наименование продукта'
                            name='name'
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>

                <div className={cl.input_wrap}>
                    <label className={cl.label}>
                        {" "}
                        Описание
                        <textarea
                            rows='4'
                            className={cl.input}
                            placeholder='Описание продукта'
                            name='description'
                            value={description}
                            onChange={onChange}
                            required
                        ></textarea>
                    </label>
                </div>

                <div className={cl.wrap_top}>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Цена
                            <div className={cl.relative}>
                                <div className={cl.bottom_input}>
                                    <input
                                        type='text'
                                        className={cl.input}
                                        placeholder='0.00'
                                        name='price'
                                        value={price}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Скидка
                            <div className={cl.relative}>
                                <div className={cl.bottom_input}>
                                    <input
                                        type='text'
                                        className={cl.input}
                                        placeholder='0.00'
                                        name='discount'
                                        value={discount}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Category
                            <div className={cl.relative}>
                                <select
                                    className={cl.input}
                                    style={{ display: "block" }}
                                    name='categoryId'
                                    value={categoryId}
                                    onChange={onChange}
                                    required
                                >
                                    <option value=''>
                                        --Выберите категорию--
                                    </option>
                                    {categories.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
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
                </div>

                <div className={cl.wrap_top}>
                    {/* <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Продавец
                            <input
                                type='text'
                                className={cl.input}
                                placeholder='Продавец'
                                name='seller'
                                value={seller}
                                onChange={onChange}
                                required
                            />
                        </label>
                    </div> */}
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Марка
                            <input
                                type='text'
                                className={cl.input}
                                placeholder='Марка'
                                name='brand'
                                value={brand}
                                onChange={onChange}
                                required
                            />
                        </label>
                    </div>

                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Время доставки
                            <input
                                type='text'
                                className={cl.input}
                                placeholder='Время доставки в часах'
                                name='deliveryTime'
                                value={deliveryTime}
                                onChange={onChange}
                                required
                            />
                        </label>
                    </div>

                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Склад
                            <div className={cl.relative}>
                                <div className={cl.bottom_input}>
                                    <input
                                        type='text'
                                        className={cl.input}
                                        placeholder='0'
                                        name='stock'
                                        value={stock}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                {user.role === "admin" && (
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            Продавец
                            <div className={cl.relative}>
                                <select
                                    style={{ display: "block" }}
                                    className={cl.input}
                                    name='sellerId'
                                    value={sellerId}
                                    onChange={onChange}
                                    required
                                >
                                    <option value={"undefind"}>
                                        {"Выберите продавца"}
                                    </option>
                                    {sellers.sellers.map((seller) => (
                                        <option
                                            key={seller._id}
                                            value={seller._id}
                                        >
                                            {seller.name}
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
                )}

                <MyButton type='submit'>Обновить продукт</MyButton>
            </form>
        </>
    );
};

export default UpdateProduct;
