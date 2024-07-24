"use client";

import React, { useEffect, useState } from "react";
import MainList from "@/components/products/MainList";
import "../../category.css";
import axios from "axios";

const Search = ({ searchParams }) => {
    const [data, setData] = useState({
        products: [],
        filteredProductsCount: 0,
        productsCount: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.API_URL}/api/products?keyword=${searchParams.keyword}`
                );
                setData(response.data);
            } catch (error) {
                console.error("Ошибка запроса на странице search:", error);
                setData({
                    products: [],
                    filteredProductsCount: 0,
                    productsCount: 0,
                });
            }
        };

        fetchData();
    }, [searchParams.keyword]); // Trigger useEffect when searchParams.keyword changes

    return (
        <>
            <h1 className='categoryName'>Поиск</h1>
            <MainList data={data} />
        </>
    );
};

export default Search;
