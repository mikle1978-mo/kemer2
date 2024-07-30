"use client";

import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProductContext from "@/context/ProductContext";
import CategoryContext from "@/context/CategoryContext";
import SellerContext from "@/context/SellerContext";
import AuthContext from "@/context/AuthContext";
import cl from "./NewProduct.module.css";
import MyButton from "../../UI/myButton/myButton";
import BackButton from "@/components/UI/myButton/backButton";
import { useRouter } from "next/navigation";

const NewProduct = () => {
    const router = useRouter();
    const { newProduct, updated, setUpdated, loading, error } =
        useContext(ProductContext);
    const { categories } = useContext(CategoryContext);
    const { user } = useContext(AuthContext);
    const { sellers } = useContext(SellerContext);
    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
        }
    }, [user]); 

    const topCategories = categories.filter((item) => item.parent === null); // Фильтрация верхнеуровневых категорий

    const [product, setProduct] = useState({
        name: "",
        description: "",
        sellerId: user && user.sellerId ? user.sellerId : "",
        brand: "",
        price: "",
        discount: "",
        deliveryTime: "",
        stock: "",
        categoryId: "",
    });

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        if (updated) {
            toast.success("Продукт создан");
            setUpdated(false);
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated, setUpdated]);

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);

        // Найдем выбранную категорию по categoryId
        const selectedCat = categories.find((cat) => cat._id === categoryId);

        if (selectedCat) {
            // Устанавливаем выбранную категорию в state продукта
            setProduct({ ...product, categoryId: categoryId });
            setSelectedSubcategory(""); // Сбрасываем выбранную подкатегорию при изменении категории

            // Фильтруем подкатегории по выбранной категории (сравниваем по URI родительской категории)
            const filteredSubcategories = categories.filter(
                (cat) => cat.parent === selectedCat.uri
            );
            if (filteredSubcategories.length > 0) {
                setSubcategories(filteredSubcategories);
            }
        }
    };

    const handleSubcategoryChange = (e) => {
        const subcategoryId = e.target.value;
        setSelectedSubcategory(subcategoryId);
        setProduct({ ...product, categoryId: subcategoryId });
    };

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (selectedSubcategory) {
            // Если есть, сохраняем её как последнюю в иерархии выбранную категорию
            setProduct({ ...product, categoryId: selectedSubcategory });
        }
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
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            Категория
                            <div className={cl.relative}>
                                <select
                                    id='category'
                                    style={{ display: "block" }}
                                    className={cl.select}
                                    name='category'
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    required
                                >
                                    <option value=''>
                                        --Выберите категорию--
                                    </option>
                                    {topCategories.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
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
                    {subcategories.length > 0 && (
                        <div className={cl.input_wrap}>
                            <label className={cl.label}>
                                Подкатегория
                                <div className={cl.relative}>
                                    <select
                                        id='subcategory'
                                        style={{ display: "block" }}
                                        className={cl.select}
                                        name='subcategory'
                                        value={selectedSubcategory}
                                        onChange={handleSubcategoryChange}
                                        required
                                    >
                                        <option value=''>
                                            --Выберите подкатегорию--
                                        </option>
                                        {subcategories.map((subcat) => (
                                            <option
                                                key={subcat._id}
                                                value={subcat._id}
                                            >
                                                {subcat.name}
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
                    )}
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
                                    <select
                                        style={{ display: "block" }}
                                        className={cl.input}
                                        name='sellerId'
                                        value={""}
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
                </div>
                <MyButton type='submit' disabled={loading}>
                    {loading ? "Создание..." : "Создать продукт"}
                </MyButton>
            </form>
        </>
    );
};

export default NewProduct;
