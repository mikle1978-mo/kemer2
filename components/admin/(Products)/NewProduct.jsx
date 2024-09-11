"use client";

import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProductContext from "@/context/ProductContext";
import SellerContext from "@/context/SellerContext";
import AuthContext from "@/context/AuthContext";
import cl from "./NewProduct.module.css";
import MyButton from "../../UI/myButton/myButton";
import BackButton from "@/components/UI/myButton/backButton";
import { useRouter } from "next/navigation";
import CategorySelector from "@/components/UI/CategorySelector/CategorySelector";

const NewProduct = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const { newProduct, updated, setUpdated, loading, error } =
        useContext(ProductContext);
    const { sellers, loadingSellers } = useContext(SellerContext);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user]);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        sellerId: user && user.sellerId ? user.sellerId : "",
        brand: "",
        price: "",
        discount: "",
        deliveryTime: "",
        stock: "",
        categories: [], // массив категорий
    });

    useEffect(() => {
        if (!loading && updated) {
            toast.success("Продукт создан");
            setUpdated(false); // Сбрасываем состояние после показа тоста
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated, loading]);

    const handleCategorySelect = (selectedCategorySlug) => {
        setProduct({
            ...product,
            categories: [...product.categories, ...selectedCategorySlug],
        });
    };

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        newProduct(product);
        user?.role === "seller"
            ? router.push(`/me/admin/products/seller/${user?.sellerId}`)
            : router.push("/me/admin/products");
    };

    return (
        <>
            <div className={cl.top_row}>
                <BackButton />
                <h1 className='title'> Создать новый продукт</h1>
            </div>

            <form className={cl.form} onSubmit={submitHandler}>
                <CategorySelector onCategoryChange={handleCategorySelect} />
                <div className={cl.input_wrap}>
                    <label className={cl.label}>
                        Наименование
                        <input
                            id='name'
                            type='text'
                            className={cl.input}
                            placeholder='Product name'
                            autoComplete='off'
                            name='name'
                            value={product.name}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>

                <div className={cl.input_wrap}>
                    <label className={cl.label}>
                        Описание
                        <textarea
                            id='description'
                            rows='4'
                            className={cl.input}
                            placeholder='Product description'
                            autoComplete='off'
                            name='description'
                            value={product.description}
                            onChange={onChange}
                            required
                        ></textarea>
                    </label>
                </div>

                <div className={cl.input_wrap_bottom}>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
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
                                        value={product.price}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
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
                                        value={product.discount}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                <div className={cl.input_seller_cont}>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            Марка
                            <input
                                id='brand'
                                type='text'
                                className={cl.input}
                                placeholder='Brand'
                                autoComplete='off'
                                name='brand'
                                value={product.brand}
                                onChange={onChange}
                                required
                            />
                        </label>
                    </div>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            Время доставки
                            <input
                                id='deliveryTime'
                                type='text'
                                className={cl.input}
                                placeholder='delivery time'
                                autoComplete='off'
                                name='deliveryTime'
                                value={product.deliveryTime}
                                onChange={onChange}
                                required
                            />
                        </label>
                    </div>

                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
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
                                        value={product.stock}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    {user?.role === "admin" && (
                        <div className={cl.input_wrap}>
                            <label className={cl.label}>
                                Продавец
                                <div className={cl.relative}>
                                    {loadingSellers ? (
                                        <p>Загрузка продавцов...</p>
                                    ) : (
                                        <select
                                            style={{ display: "block" }}
                                            className={cl.input}
                                            name='sellerId'
                                            value={product.sellerId}
                                            onChange={onChange}
                                            required
                                        >
                                            <option
                                                value=''
                                                className={cl.input}
                                            >
                                                Выберите продавца
                                            </option>
                                            {sellers.map((seller) => (
                                                <option
                                                    key={seller._id}
                                                    value={seller._id}
                                                >
                                                    {seller.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
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
                    )}
                </div>
                <MyButton type='submit' disabled={loading}>
                    {loading ? "Создание..." : "Создать продукт"}
                </MyButton>
            </form>
        </>
    );
};

export default NewProduct;
