"use client";

import AdsContext from "@/context/AdsContext";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import cl from "./NewAds.module.css";
import MyButton from "../../UI/myButton/myButton";
import { adsType } from "@/lib/adsType/adsType";

const NewAds = () => {
    const { newAds, updated, setUpdated, loading, error } =
        useContext(AdsContext);

    if (!newAds && !updated && !setUpdated && !loading && !error) {
        throw new Error(" components admin ads newAds ошибка контекста");
    }

    const [ads, setAds] = useState({
        type: "",
        advertiser: "",
        name: "",
        siteUrl: "",
        contactName: "",
        contactPhone: "",
    });

    useEffect(() => {
        if (updated) {
            toast.success("Реклама создана");
            setUpdated(false);
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const { type, advertiser, name, siteUrl, contactName, contactPhone } = ads;

    const onChange = (e) => {
        setAds({ ...ads, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        newAds(ads);
    };

    return (
        <>
            <h1 className={cl.title}>Создать новую рекламу</h1>

            <form className={cl.form} onSubmit={submitHandler}>
                <div className={cl.input_wrap}>
                    <label className={cl.label}>
                        {" "}
                        Тип рекламы
                        <div className={cl.relative}>
                            <select
                                id='type'
                                style={{ display: "block" }}
                                className={cl.select}
                                name='type'
                                value={type}
                                onChange={onChange}
                                required
                            >
                                <option value=''>--Выберите тип--</option>
                                {adsType.map((item) => (
                                    <option key={item.id} value={item.type}>
                                        {item.type}
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
                <div className={cl.input_wrap}>
                    <label className={cl.label}>
                        {" "}
                        Рекламодатель
                        <input
                            id='advertiser'
                            type='text'
                            className={cl.input}
                            placeholder='Название рекламодателя'
                            autoComplete='off'
                            name='advertiser'
                            value={advertiser}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>
                <div className={cl.input_wrap}>
                    <label className={cl.label}>
                        {" "}
                        Продукт
                        <input
                            id='name'
                            type='text'
                            className={cl.input}
                            placeholder='Наименование продукта, товара, услуги'
                            autoComplete='off'
                            name='name'
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>
                <div className={cl.input_seller_cont}>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Url
                            <div className={cl.relative}>
                                <div className='col-span-2'>
                                    <input
                                        id='siteUrl'
                                        type='text'
                                        className={cl.input}
                                        placeholder='Полный URL сайта'
                                        autoComplete='off'
                                        name='siteUrl'
                                        value={siteUrl}
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
                            Контактное лицо
                            <div className={cl.relative}>
                                <div className='col-span-2'>
                                    <input
                                        id='contactName'
                                        type='text'
                                        className={cl.input}
                                        placeholder='Контактное лицо'
                                        autoComplete='off'
                                        name='contactName'
                                        value={contactName}
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
                            Телефон
                            <div className={cl.relative}>
                                <div className='col-span-2'>
                                    <input
                                        id='contactPhone'
                                        type='text'
                                        className={cl.input}
                                        placeholder='Телефон контактного лица'
                                        autoComplete='off'
                                        name='contactPhone'
                                        value={contactPhone}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                <MyButton type='submit' disabled={loading ? true : false}>
                    {loading ? "Создание..." : "Создать рекламу"}
                </MyButton>
            </form>
        </>
    );
};

export default NewAds;
