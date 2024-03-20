"use client";

import ProductContext from "@/context/ProductContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { categories } from "@/lib/categoty/category";
import cl from "./UpdateProduct.module.css";
import MyButton from "../UI/myButton/myButton";

const UpdateProduct = ({ data }) => {
    const { updateProduct, error, updated, setUpdated, clearErrors } =
        useContext(ProductContext);

    const [product, setProduct] = useState({
        name: data?.name,
        description: data?.description,
        seller: data?.seller,
        price: data?.price,
        stock: data?.stock,
        category: data?.category,
    });

    useEffect(() => {
        if (updated) {
            toast.success("Продукт обновлен");
            setUpdated(false);
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const { name, description, seller, price, stock, category } = product;

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        updateProduct(product, data?._id);
    };

    return (
        <section>
            <h1 className={cl.title}>Обновление продукта</h1>

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
                            Category
                            <div className={cl.relative}>
                                <select
                                    className={cl.input}
                                    style={{ display: "block" }}
                                    name='category'
                                    value={category}
                                    onChange={onChange}
                                    required
                                >
                                    {categories.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.category}
                                        >
                                            {item.category}
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
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Продавец/Марка
                            <input
                                type='text'
                                className={cl.input}
                                placeholder='Продавец или марка'
                                name='seller'
                                value={seller}
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

                <MyButton type='submit'>Обновить продукт</MyButton>
            </form>
        </section>
    );
};

export default UpdateProduct;
