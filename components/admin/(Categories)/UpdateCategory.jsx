"use client";

import CategoryContext from "@/context/CategoryContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../admin.css";
import MyButton from "../../UI/myButton/myButton";
import { useRouter } from "next/navigation";

const UpdateCategory = ({ data, item }) => {
    const { updateCategory, error, updated, setUpdated, clearErrors } =
        useContext(CategoryContext);
    if (!updateCategory && !updated && !setUpdated && !clearErrors && !error) {
        throw new Error(" components admin NewCategories ошибка контекста");
    }

    const router = useRouter();

    const [category, setCategory] = useState({
        name: item?.name,
        parent: item?.parent,
        slug: item?.slug,
    });

    useEffect(() => {
        if (updated) {
            toast.success("Категория обновлена");
            router.push("/me/admin/categories");
            setUpdated(false);
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const { name, parent, slug } = category;

    const onChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        updateCategory(category, item?._id);
    };

    return (
        <section>
            <h1 className='title'>Обновление категории</h1>

            <form className='form' onSubmit={submitHandler}>
                <div className='input_wrap'>
                    <label className='label'>
                        {" "}
                        Родительская категория
                        <div className='relative'>
                            <select
                                id='parent'
                                style={{ display: "block" }}
                                className='select'
                                name='parent'
                                value={parent || ""}
                                onChange={onChange}
                            >
                                <option value=''>
                                    --Выберите родительскую категорию--
                                </option>
                                {data.categories.map((item) => (
                                    <option key={item._id} value={item.slug}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <i className='select_arrow'>
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

                <div className='input_wrap'>
                    <label className='label'>
                        {" "}
                        Наименование категории
                        <input
                            id='name'
                            type='text'
                            className='input'
                            placeholder='По русски сбольшой буквы'
                            autoComplete='off'
                            name='name'
                            value={name || ""}
                            onChange={onChange}
                        />
                    </label>
                </div>
                <div className='input_seller_cont'>
                    <div className='input_wrap'>
                        <label className='label'>
                            {" "}
                            SLUG
                            <div className='relative'>
                                <div className='col-span-2'>
                                    <input
                                        id='slug'
                                        type='text'
                                        className='input'
                                        placeholder='категория на английском'
                                        autoComplete='off'
                                        name='slug'
                                        value={slug || ""}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <MyButton type='submit'>Обновить категорию</MyButton>
            </form>
        </section>
    );
};

export default UpdateCategory;
