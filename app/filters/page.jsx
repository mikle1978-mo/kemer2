"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { getPriceQueryParams } from "@/helpers/helpers";
import { categories } from "@/lib/categoty/category";
import { mark } from "@/lib/const/const";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import cl from "./page.module.css";
import MyButton from "../../components/UI/myButton/myButton";

const Filters = () => {
    const StarRatings = dynamic(() => import("react-star-ratings"), {
        ssr: false,
    });
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");

    const router = useRouter();

    let queryParams;

    function handleClick(checkbox) {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);
        }

        const checkboxes = document.getElementsByName(checkbox.name);

        checkboxes.forEach((item) => {
            if (item !== checkbox) item.checked = false;
        });

        if (checkbox.checked === false) {
            // Delete the filter from query
            queryParams.delete(checkbox.name);
        } else {
            // Set filter in the query
            if (queryParams.has(checkbox.name)) {
                queryParams.set(checkbox.name, checkbox.value);
            } else {
                queryParams.append(checkbox.name, checkbox.value);
            }
        }
        const path = "/" + "?" + queryParams.toString();
        router.push(path);
    }

    function handleButtonClick() {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);

            queryParams = getPriceQueryParams(queryParams, "min", min);
            queryParams = getPriceQueryParams(queryParams, "max", max);

            const path = "/" + "?" + queryParams.toString();
            router.push(path);
        }
    }

    function checkHandler(checkBoxType, checkBoxValue) {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);

            const value = queryParams.get(checkBoxType);
            if (checkBoxValue === value) return true;
            return false;
        }
    }

    return (
        <aside className={cl.filters_active}>
            <div className='section'>
                <hr className='hr' />
                <details>
                    <summary className={cl.summary}>Открыть фильтры</summary>
                    <div className={cl.price}>
                        <h3 className='title'>Цена ({mark})</h3>
                        <div className={cl.price_wrap}>
                            <div className={cl.input_wrap}>
                                <input
                                    id='min'
                                    name='min'
                                    className={cl.input}
                                    type='number'
                                    placeholder='мин'
                                    autoComplete='off'
                                    value={min}
                                    onChange={(e) => setMin(e.target.value)}
                                />
                            </div>

                            <div className={cl.input_wrap}>
                                <input
                                    id='max'
                                    name='max'
                                    className={cl.input}
                                    type='number'
                                    autoComplete='off'
                                    placeholder='макс'
                                    value={max}
                                    onChange={(e) => setMax(e.target.value)}
                                />
                            </div>
                            <MyButton onClick={handleButtonClick}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </MyButton>
                        </div>
                    </div>
                    <h3 className='title'>Рейтинг</h3>
                    <ul className={cl.category_list}>
                        <li className={cl.li}>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <label key={rating} className={cl.list_item}>
                                    <input
                                        id={`rating-${rating}`}
                                        name='ratings'
                                        type='checkbox'
                                        value={rating}
                                        className={cl.checkbox}
                                        defaultChecked={checkHandler(
                                            "ratings",
                                            `${rating}`
                                        )}
                                        onClick={(e) => handleClick(e.target)}
                                    />
                                    <span className={cl.rating}>
                                        <StarRatings
                                            rating={rating}
                                            starRatedColor='rgba(255, 153, 0, 1)'
                                            numberOfStars={5}
                                            starDimension='18px'
                                            starSpacing='1px'
                                            name={`rating-${rating}`}
                                        />
                                    </span>
                                </label>
                            ))}
                        </li>
                    </ul>
                </details>
                <hr className='hr' />

                <div className={cl.category}>
                    {/* <h3 className='title'>Категория</h3> */}
                    <ul className={cl.category_list}>
                        {categories.map((item) => (
                            <li key={item.id} className={cl.category_li}>
                                <label className={cl.list_item}>
                                    <input
                                        id={item.id}
                                        name='category'
                                        type='checkbox'
                                        value={item.category}
                                        style={{ display: "none" }}
                                        className={cl.checkbox}
                                        defaultChecked={checkHandler(
                                            "category",
                                            `${item.category}`
                                        )}
                                        onClick={(e) => handleClick(e.target)}
                                    />
                                    <span className='ml-2 text-gray-500'>
                                        {" "}
                                        {item.category}
                                    </span>
                                    <span className='ml-2 text-gray-500'>
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                    </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Filters;
