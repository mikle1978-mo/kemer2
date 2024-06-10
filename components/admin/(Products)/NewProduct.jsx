"use client";

import ProductContext from "@/context/ProductContext";
import { useContext, useState, useEffect } from "react";
import { categories } from "@/lib/categoty/category";
import { toast } from "react-toastify";
import cl from "./NewProduct.module.css";
import MyButton from "../../UI/myButton/myButton";

const NewProduct = () => {
    const { newProduct, updated, setUpdated, loading, error } =
        useContext(ProductContext);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        seller: "",
        price: "",
        discount: "",
        stock: "",
        category: "",
    });

    useEffect(() => {
        if (updated) {
            toast.success("Продукт создан");
            setUpdated(false);
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const { name, description, seller, price, discount, stock, category } =
        product;

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        newProduct(product);
    };

    return (
        <>
            <h1 className={cl.title}>Создать новый продукт</h1>

            <form className={cl.form} onSubmit={submitHandler}>
                <div className={cl.input_wrap}>
                    <label className={cl.label}>
                        {" "}
                        Наименование
                        <input
                            id='name'
                            type='text'
                            className={cl.input}
                            placeholder='Product name'
                            autoComplete='off'
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
                            id='description'
                            rows='4'
                            className={cl.input}
                            placeholder='Product description'
                            autoComplete='off'
                            name='description'
                            value={description}
                            onChange={onChange}
                            required
                        ></textarea>
                    </label>
                </div>

                <div className={cl.input_wrap_bottom}>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Цена
                            <div className={cl.relative}>
                                <div className={cl.input_price_cont}>
                                    <input
                                        id='price'
                                        type='text'
                                        className={cl.input}
                                        placeholder='0.00'
                                        autoComplete='off'
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
                                <div className={cl.input_price_cont}>
                                    <input
                                        id='discount'
                                        type='text'
                                        className={cl.input}
                                        placeholder='0.00'
                                        autoComplete='off'
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
                            Категория
                            <div className={cl.relative}>
                                <select
                                    id='category'
                                    style={{ display: "block" }}
                                    className={cl.select}
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
                                <i className={cl.select_arrow}>
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

                <div className={cl.input_seller_cont}>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Продавец / Марка
                            <input
                                id='seller'
                                type='text'
                                className={cl.input}
                                placeholder='Seller or brand'
                                autoComplete='off'
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
                                <div className='col-span-2'>
                                    <input
                                        id='stock'
                                        type='text'
                                        className={cl.input}
                                        placeholder='0'
                                        autoComplete='off'
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
                <MyButton type='submit' disabled={loading ? true : false}>
                    {loading ? "Создание..." : "Создать продукт"}
                </MyButton>
            </form>
        </>
    );
};

export default NewProduct;
