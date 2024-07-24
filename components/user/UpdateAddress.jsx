"use client";

import React, { useState, useContext, useEffect } from "react";


import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import cl from "./UpdateAddress.module.css";
import MyButton from "../UI/myButton/myButton";
import { regions } from "@/lib/regions/region";

const UpdateAddress = ({ id, address }) => {
    const {
        error,
        updated,
        setUpdated,
        updateAddress,
        deleteAddress,
        clearErrors,
    } = useContext(AuthContext);

    
    const [street, setStreet] = useState(address.street);
    const [city, setCity] = useState(address.city);
    const [state, setState] = useState(address.state);
    const [zipCode, setZipCode] = useState(address.zipCode);
    const [phoneNo, setPhonoNo] = useState(address.phoneNo);
    const [country, setCountry] = useState(address.country);
    const [addInfo, setAddInfo] = useState(address.addInfo);

    useEffect(() => {
        if (updated) {
            toast.success("Адрес обновлен");
            setUpdated(false);
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const submitHandler = (e) => {
        e.preventDefault();

        const newAddress = {
            street,
            city,
            state,
            zipCode,
            phoneNo,
            country,
            addInfo,
        };

        updateAddress(id, newAddress);
    };

    const deleteHandler = () => {
        deleteAddress(id);
    };

    return (
        <>
            <section className={cl.section}>
                <div className='container'>
                    <div className={cl.wrap}>
                        <div
                            style={{ maxWidth: "480px" }}
                            className={cl.form_wrap}
                        >
                            <form onSubmit={submitHandler}>
                                <h2 className={cl.form_title}>
                                    Обновить адрес
                                </h2>
                                <div className={cl.input_wrap}>
                                    <label className={cl.label}>
                                        {" "}
                                        Город{" "}
                                        <input
                                            className={cl.input}
                                            type='text'
                                            placeholder='Type your city'
                                            value={city}
                                            disabled
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        />
                                    </label>
                                </div>

                                <div className={cl.input_street_wrap}>
                                    <label className={cl.label}>
                                        {" "}
                                        Улица{" "}
                                        <input
                                            className={cl.input}
                                            type='text'
                                            placeholder='Type your address'
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

                                <div className={cl.input_zip_wrap}>
                                    {/* <div className={cl.input_wrap}>
                                        <label className={cl.label}>
                                            {" "}
                                            ИНДЕКС{" "}
                                            <input
                                                className={cl.input}
                                                type='number'
                                                placeholder='Type zip code here'
                                                value={zipCode}
                                                onChange={(e) =>
                                                    setZipCode(e.target.value)
                                                }
                                            />
                                        </label>
                                    </div> */}

                                    <div className={cl.input_wrap}>
                                        <label className={cl.label}>
                                            {" "}
                                            Телефон{" "}
                                            <input
                                                className={cl.input}
                                                type='number'
                                                placeholder='Type phone no here'
                                                value={phoneNo}
                                                onChange={(e) =>
                                                    setPhonoNo(e.target.value)
                                                }
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* <div className={cl.input_country_wrap}>
                                    <label className={cl.label}>
                                        {" "}
                                        Страна{" "}
                                        <select
                                            className={cl.input}
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                        >
                                            {countriesList.map((country) => (
                                                <option
                                                    key={country.name}
                                                    value={country.name}
                                                >
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div> */}

                                <div className={cl.input_wrap}>
                                    <label className={cl.label}>
                                        {" "}
                                        Дополнительно{" "}
                                        <textarea
                                            id='addInfo'
                                            rows='4'
                                            className={cl.input}
                                            value={addInfo}
                                            placeholder='Все что желаете дополнительно указать'
                                            // value='Кемер'
                                            onChange={(e) =>
                                                setAddInfo(e.target.value)
                                            }
                                        />
                                    </label>
                                </div>
                                <div className={cl.button_wrap}>
                                    <MyButton type='submit'>Обновить</MyButton>

                                    <MyButton
                                        type='submit'
                                        onClick={deleteHandler}
                                        style={{ backgroundColor: "red" }}
                                    >
                                        Удалить
                                    </MyButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UpdateAddress;
