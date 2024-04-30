"use client";

import React, { useState, useContext, useEffect } from "react";
import { countries } from "countries-list";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import cl from "./NewAddress.module.css";
import MyButton from "../UI/myButton/myButton";
import { regions } from "@/lib/regions/region";

const NewAddress = () => {
    const { error, addNewAddress, clearErrors } = useContext(AuthContext);

    const countriesList = Object.values(countries);

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNo, setPhonoNo] = useState("");
    const [country, setCountry] = useState("");
    const [addInfo, setAddInfo] = useState("");

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    const submitHandler = (e) => {
        e.preventDefault();

        const newAddress = {
            street,
            city: "Кемер",
            state,
            zipCode: "000000",
            phoneNo,
            country: "Tурция",
            addInfo,
        };

        addNewAddress(newAddress);
    };

    return (
        <>
            <div className={cl.wrap}>
                <main className={cl.mail}>
                    <div style={{ maxWidth: "480px" }} className={cl.form_wrap}>
                        <form onSubmit={submitHandler}>
                            <h2 className={cl.title}>Добавить новый адрес</h2>

                            <div className={cl.input_wrap}>
                                <label className={cl.label}>
                                    {" "}
                                    Город{" "}
                                    <input
                                        className={cl.input}
                                        defaultValue='Кемер'
                                        type='text'
                                        placeholder='Кемер'
                                        disabled
                                        // value='Кемер'
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                            <div className={cl.info}>
                                !!! Магазин работает только в районах г. Кемер
                            </div>
                            {/* <div className={cl.input_wrap}>
                                        <label className={cl.label}>
                                            {" "}
                                            Район (обязательно){" "}
                                            <input
                                                className={cl.input}
                                                type='text'
                                                placeholder='район Кемера'
                                                value={state}
                                                onChange={(e) =>
                                                    setState(e.target.value)
                                                }
                                            />
                                        </label>
                                    </div> */}
                            <div className={cl.input_wrap}>
                                <label className={cl.label}>
                                    {" "}
                                    Район (обязательно){" "}
                                    <select
                                        id='region'
                                        style={{ display: "block" }}
                                        className={cl.input}
                                        name='region'
                                        value={state}
                                        required
                                        onChange={(e) =>
                                            setState(e.target.value)
                                        }
                                    >
                                        <option value=''>
                                            --Выберите район Кемера--
                                        </option>
                                        {regions.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.region}
                                            >
                                                {item.region}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <div className={cl.input_section}>
                                <label className={cl.label}>
                                    {" "}
                                    Улица (обязательно){" "}
                                    <input
                                        className={cl.input}
                                        type='text'
                                        placeholder='введите улицу'
                                        value={street}
                                        onChange={(e) =>
                                            setStreet(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                            <div className={cl.input_wrap}>
                                <label className={cl.label}>
                                    {" "}
                                    Тел: (обязательно){" "}
                                    <input
                                        className={cl.input}
                                        type='number'
                                        placeholder='введите номер телефона'
                                        value={phoneNo}
                                        onChange={(e) =>
                                            setPhonoNo(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                            <div className={cl.top_section}></div>
                            <div className={cl.top_section}>
                                <div className={cl.input_wrap}>
                                    <label className={cl.label}>
                                        {" "}
                                        Дополнительно{" "}
                                        <textarea
                                            id='addInfo'
                                            rows='4'
                                            className={cl.input}
                                            defaultValue=''
                                            placeholder='Все что желаете дополнительно указать'
                                            // value='Кемер'
                                            onChange={(e) =>
                                                setAddInfo(e.target.value)
                                            }
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* <div className={cl.bottom_section}>
                                        <div className={cl.input_wrap}>
                                            <label className={cl.label}>
                                                {" "}
                                                Индекс{" "}
                                                <input
                                                    className={cl.input}
                                                    type='number'
                                                    defaultValue='000000'
                                                    // value='000000'
                                                    placeholder='необязательно'
                                                    // value={zipCode}
                                                    onChange={(e) =>
                                                        setZipCode(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </div> */}

                            {/* <div className={cl.input_section}>
                                        <label className={cl.label}>
                                            {" "}
                                            Страна{" "}
                                            <input
                                                className={cl.input}
                                                placeholder='Турция'
                                                disabled
                                                // value={country}
                                                defaultValue='Турция'
                                                // value='Турция'
                                                onChange={(e) =>
                                                    setCountry(e.target.value)
                                                }
                                            />
                                        </label>
                                    </div> */}
                            <MyButton type='submit'>Добавить</MyButton>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};

export default NewAddress;
