"use client";

import ProductContext from "@/context/ProductContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { categories } from "@/lib/categoty/category";
import cl from "./UpdateProduct.module.css";
import MyButton from "../../UI/myButton/myButton";
import { useRouter } from "next/navigation";

const UpdateProduct = ({ data }) => {
    const { updateProduct, error, updated, setUpdated, clearErrors } =
        useContext(ProductContext);

    const router = useRouter();

    const [product, setProduct] = useState({
        name: data?.name,
        description: data?.description,
        seller: data?.seller,
        brand: data?.brand,
        price: data?.price,
        discount: data?.discount,
        deliveryPrice: data?.deliveryPrice,
        deliveryTime: data?.deliveryTime,
        stock: data?.stock,
        category: data?.category,
    });

    useEffect(() => {
        if (updated) {
            toast.success("Продукт обновлен");
            router.push("/admin/products");
            setUpdated(false);
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const {
        name,
        description,
        seller,
        brand,
        price,
        discount,
        deliveryPrice,
        deliveryTime,
        stock,
        category,
    } = product;

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
                                    name='category'
                                    value={category}
                                    onChange={onChange}
                                    required
                                >
                                    <option value=''>
                                        --Выберите категорию--
                                    </option>
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
                    </div>
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
                            Стоимость доставки
                            <input
                                type='text'
                                className={cl.input}
                                placeholder='Стоимость доставки в лирах'
                                name='deliveryPrice'
                                value={deliveryPrice}
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

                <MyButton type='submit'>Обновить продукт</MyButton>
            </form>
        </section>
    );
};

export default UpdateProduct;
