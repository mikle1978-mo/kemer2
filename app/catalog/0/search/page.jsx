"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import "../../category.css";

const SearchResults = dynamic(
    () => import("@/components/products/SearchResults"),
    { ssr: false }
);

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
                    `${process.env.API_URL}/api/products/search?keyword=${searchParams.keyword}`
                );
                console.log("response", response.data);
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
            {typeof window !== "undefined" && <SearchResults data={data} />}
        </>
    );
};

export default Search;
