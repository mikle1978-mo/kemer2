"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { getPriceQueryParams } from "@/helpers/helpers";
import { categories } from "@/lib/categoty/category";
import { mark } from "@/lib/const/const";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import cl from "./Filters.module.css";
import MenuContext from "@/context/MenuContext";

const Filters = () => {
    const { isActiveMenu } = useContext(MenuContext);
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
        const path = window.location.pathname + "?" + queryParams.toString();
        router.push(path);
    }

    function handleButtonClick() {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);

            queryParams = getPriceQueryParams(queryParams, "min", min);
            queryParams = getPriceQueryParams(queryParams, "max", max);

            const path =
                window.location.pathname + "?" + queryParams.toString();
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
        <aside className={isActiveMenu ? cl.filters_active : cl.filters}>
            <div className={cl.price}>
                <h3 className={cl.title}>Цена ({mark})</h3>
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

                    <div className={cl.title}>
                        <button
                            className={cl.price_btn}
                            onClick={handleButtonClick}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={cl.category}>
                <h3 className={cl.title}>Категория</h3>
                <ul className={cl.category_list}>
                    {categories.map((item) => (
                        <li key={item.id} className={cl.li}>
                            <label className={cl.list_item}>
                                <input
                                    id={item.id}
                                    name='category'
                                    type='checkbox'
                                    value={item.category}
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
                            </label>
                        </li>
                    ))}
                </ul>

                <hr className='my-4' />

                <h3 className={cl.title}>Рейтинг</h3>
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
            </div>
        </aside>
    );
};

export default Filters;
