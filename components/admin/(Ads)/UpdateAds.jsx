"use client";

import AdsContext from "@/context/AdsContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import cl from "./UpdateAds.module.css";
import MyButton from "../../UI/myButton/myButton";
import { useRouter } from "next/navigation";
import { adsType } from "@/lib/adsType/adsType";

const UpdateAds = ({ data }) => {
    const { updateAds, error, updated, setUpdated, clearErrors } =
        useContext(AdsContext);
        if (!updateAds && !updated && !setUpdated && !loading && !error) {
            throw new Error(" components admin ads UpdateAds ошибка контекста");
        }

    const router = useRouter();

    const [ads, setAds] = useState({
        type: data?.type,
        advertiser: data?.advertiser,
        name: data?.name,
        siteUrl: data?.siteUrl,
        contactName: data?.contactName,
        contactPhone: data?.contactPhone,
    });

    useEffect(() => {
        if (updated) {
            toast.success("Реклама обновлена");
            router.push("/admin/ads");
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

        updateAds(ads, data?._id);
    };

    return (
        <section>
            <h1 className={cl.title}>Обновление рекламы</h1>

            <form onSubmit={submitHandler}>
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
                            type='text'
                            className={cl.input}
                            placeholder='Рекламодатель'
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

                <div className={cl.wrap_top}>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Url
                            <div className={cl.relative}>
                                <div className={cl.bottom_input}>
                                    <input
                                        type='text'
                                        className={cl.input}
                                        placeholder='Url сайта'
                                        name='siteUrl'
                                        value={siteUrl}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className={cl.wrap_top}>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Контакт
                            <div className={cl.relative}>
                                <div className={cl.bottom_input}>
                                    <input
                                        type='text'
                                        className={cl.input}
                                        placeholder='Имя контакта'
                                        name='contactName'
                                        value={contactName}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className={cl.input_wrap}>
                        <label className={cl.label}>
                            {" "}
                            Контакт
                            <div className={cl.relative}>
                                <div className={cl.bottom_input}>
                                    <input
                                        type='text'
                                        className={cl.input}
                                        placeholder='Телефон'
                                        name='contactPhone'
                                        value={contactPhone}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <MyButton type='submit'>Обновить рекламу</MyButton>
            </form>
        </section>
    );
};

export default UpdateAds;
