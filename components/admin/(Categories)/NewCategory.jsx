"use client";

import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../admin.css";
import MyButton from "../../UI/myButton/myButton";
import CategoryContext from "@/context/CategoryContext";
import SlugSelector from "@/components/UI/SlugSelector/SlugSelector";

const NewCategory = () => {
    const { newCategory, updated, setUpdated, loading, error } =
        useContext(CategoryContext);

    const [category, setCategory] = useState({
        name: "",
        slug: [], // Слаги будут обновляться через SlugSelector
        description: "",
        seo: {
            title: "",
            description: "",
            keywords: [""],
        },
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

    const { name, slug, description, seo } = category;

    const onChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const onSeoChange = (e) => {
        setCategory({
            ...category,
            seo: { ...seo, [e.target.name]: e.target.value },
        });
    };

    // Обновление слагов через SlugSelector
    const handleSlugsChange = (updatedSlugs) => {
        setCategory({ ...category, slug: updatedSlugs });
    };

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
        newCategory(category); // Отправка данных категории
    };

    return (
        <>
            <h1 className='title'>Создать новую категорию</h1>

            <form className='form' onSubmit={submitHandler}>
                {/* Компонент для выбора слагов */}
                <SlugSelector onSlugsChange={handleSlugsChange} />

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

                {/* SEO поля */}
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

                {/* SEO ключевые слова */}
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

                <MyButton type='submit' disabled={loading ? true : false}>
                    {loading ? "Создание..." : "Создать категорию"}
                </MyButton>
            </form>
        </>
    );
};

export default NewCategory;
