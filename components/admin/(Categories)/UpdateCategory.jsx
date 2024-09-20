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
        throw new Error("components admin UpdateCategory ошибка контекста");
    }

    const router = useRouter();

    const [category, setCategory] = useState({
        name: item?.name || "",
        parent: item?.parent || "",
        slug: item?.slug || [],
        description: item?.description || "",
        seo: {
            title: item?.seo?.title || "",
            description: item?.seo?.description || "",
            keywords: item?.seo?.keywords || [""],
        },
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

    const { name, parent, slug, description, seo } = category;

    // Общий обработчик изменений полей
    const onChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    // Обработчик изменений SEO данных
    const onSeoChange = (e) => {
        setCategory({
            ...category,
            seo: { ...seo, [e.target.name]: e.target.value },
        });
    };

    // Обработка изменения ключевых слов SEO
    const onSeoKeywordChange = (index, e) => {
        const newKeywords = [...seo.keywords];
        newKeywords[index] = e.target.value;
        setCategory({
            ...category,
            seo: { ...seo, keywords: newKeywords },
        });
    };

    const addSeoKeyword = () => {
        setCategory({
            ...category,
            seo: { ...seo, keywords: [...seo.keywords, ""] },
        });
    };

    const removeSeoKeyword = (index) => {
        const newKeywords = [...seo.keywords];
        newKeywords.splice(index, 1);
        setCategory({
            ...category,
            seo: { ...seo, keywords: newKeywords },
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        updateCategory(category, item?._id);
    };

    return (
        <section>
            <h1 className='title'>Обновление категории</h1>

            <form className='form' onSubmit={submitHandler}>
                {/* Родительская категория */}
                <div className='input_wrap'>
                    <label className='label'>
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

                {/* Наименование категории */}
                <div className='input_wrap'>
                    <label className='label'>
                        Наименование категории
                        <input
                            id='name'
                            type='text'
                            className='input'
                            placeholder='Введите название категории'
                            autoComplete='off'
                            name='name'
                            value={name || ""}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>

                {/* Описание категории */}
                <div className='input_wrap'>
                    <label className='label'>
                        Описание категории
                        <textarea
                            id='description'
                            className='textarea'
                            placeholder='Описание категории'
                            name='description'
                            value={description || ""}
                            onChange={onChange}
                        />
                    </label>
                </div>

                {/* SEO Заголовок */}
                <div className='input_wrap'>
                    <label className='label'>
                        SEO Заголовок
                        <input
                            id='seo-title'
                            type='text'
                            className='input'
                            placeholder='SEO заголовок'
                            autoComplete='off'
                            name='title'
                            value={seo.title || ""}
                            onChange={onSeoChange}
                        />
                    </label>
                </div>

                {/* SEO Описание */}
                <div className='input_wrap'>
                    <label className='label'>
                        SEO Описание
                        <textarea
                            id='seo-description'
                            className='textarea'
                            placeholder='SEO описание'
                            name='description'
                            value={seo.description || ""}
                            onChange={onSeoChange}
                        />
                    </label>
                </div>

                {/* SEO Ключевые слова */}
                <div className='input_wrap'>
                    <label className='label'>
                        SEO Ключевые слова
                        <div>
                            {seo.keywords.map((keyword, index) => (
                                <div key={index} className='seo-keyword'>
                                    <input
                                        type='text'
                                        className='input'
                                        placeholder={`Ключевое слово ${
                                            index + 1
                                        }`}
                                        value={keyword || ""}
                                        onChange={(e) =>
                                            onSeoKeywordChange(index, e)
                                        }
                                    />
                                    {index > 0 && (
                                        <button
                                            type='button'
                                            className='remove-seo-keyword'
                                            onClick={() =>
                                                removeSeoKeyword(index)
                                            }
                                        >
                                            Удалить
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type='button'
                                className='add-seo-keyword'
                                onClick={addSeoKeyword}
                            >
                                Добавить ключевое слово
                            </button>
                        </div>
                    </label>
                </div>

                <MyButton type='submit'>Обновить категорию</MyButton>
            </form>
        </section>
    );
};

export default UpdateCategory;
