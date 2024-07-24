"use client";

import { useContext, useState, useEffect } from "react";

import { toast } from "react-toastify";
import "../admin.css";
import MyButton from "../../UI/myButton/myButton";
import CategoryContext from "@/context/CategoryContext";
import { byField } from "@/helpers/helpers";

const NewCategory = () => {
    const { newCategory, updated, setUpdated, loading, error, categories } =
        useContext(CategoryContext);

    if (!newCategory && !updated && !setUpdated && !loading && !error) {
        throw new Error(" components admin ads NewCategories ошибка контекста");
    }

    const [category, setCategory] = useState({
        name: "",
        parent: "",
        uri: "",
    });

    useEffect(() => {
        if (updated) {
            toast.success("Категория создана");
            setUpdated(false);
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const { name, parent, uri } = category;

    const onChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        newCategory(category);
    };

    return (
        <>
            <h1 className='title'>Создать новую категорию</h1>

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
                                value={parent}
                                onChange={onChange}
                                required
                            >
                                <option value=''>
                                    --Выберите родительскую категорию--
                                </option>
                                {categories.map((item) => (
                                    <option key={item._id} value={item.uri}>
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
                            URI
                            <div className='relative'>
                                <div className='col-span-2'>
                                    <input
                                        id='uri'
                                        type='text'
                                        className='input'
                                        placeholder='транскрипция на английском, например: zamorozka'
                                        autoComplete='off'
                                        name='uri'
                                        value={uri || ""}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <MyButton type='submit' disabled={loading ? true : false}>
                    {loading ? "Создание..." : "Создать категорию"}
                </MyButton>
            </form>
        </>
    );
};

export default NewCategory;
