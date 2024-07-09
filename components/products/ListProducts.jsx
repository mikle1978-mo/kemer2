"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import ReclamItem from "./ReclamItem";
import cl from "./ListProducts.module.css";
import { useInView } from "react-intersection-observer";
import queryString from "query-string";

const ListProducts = ({ searchParams }) => {
    const [offset, setOffset] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0); // Добавляем productsCount в состояние
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const prevSearchParams = useRef({});

    useEffect(() => {
        // При изменении searchParams сбрасываем offset, продукты и productsCount
        setOffset(0);
        setProducts([]);
        setProductsCount(0);
        prevSearchParams.current = searchParams;
        fetchProducts(true); // Передаем true для forceRefresh
    }, [searchParams]);

    const fetchProducts = async (forceRefresh = false) => {
        const urlParams = {
            keyword: searchParams.keyword,
            page: searchParams.page,
            limit: process.env.NUMBER_OF_PRODUCTS,
            offset: offset,
            forceRefresh: forceRefresh, // Используем переданный параметр
            category: searchParams.category,
            "price[gte]": searchParams.min,
            "price[lte]": searchParams.max,
            "ratings[gte]": searchParams.ratings,
        };

        const searchQuery = queryString.stringify(urlParams);

        try {
            setLoading(true);
            console.log(`Fetching products with query: ${searchQuery}`);
            const apiProducts = await axios.get(
                `${process.env.API_URL}/api/products?${searchQuery}`
            );
            console.log("Received products:", apiProducts.data);

            // Обновляем состояние продуктов, добавляя новые к уже загруженным
            setProducts((prevProducts) => [
                ...prevProducts,
                ...apiProducts.data.products.filter(
                    (newProduct) =>
                        // Фильтруем, чтобы не добавлять продукты с уже существующими id
                        !prevProducts.some(
                            (existingProduct) =>
                                existingProduct._id === newProduct._id
                        )
                ),
            ]);

            // Обновляем offset на основе уже загруженных продуктов
            setOffset(offset + apiProducts.data.products.length);

            // Обновляем productsCount после загрузки новых данных
            setProductsCount(apiProducts.data.productsCount);

            setLoading(false);
        } catch (error) {
            console.error("Error loading products:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Загружаем больше продуктов при прокрутке, если есть что загружать
        if (
            inView &&
            products.length > 0 &&
            !loading &&
            products.length < productsCount
        ) {
            fetchProducts();
        }
    }, [inView, products.length, loading, productsCount]);

    return (
        <>
            <main className={cl.listProduct}>
                {products.length > 0 ? (
                    products.map((product) =>
                        product?.advertiser ? (
                            <ReclamItem key={product?._id} product={product} />
                        ) : (
                            <ProductItem key={product?._id} product={product} />
                        )
                    )
                ) : (
                    <div>No products found.</div>
                )}
                {loading && <div>Loading more...</div>}
                {!loading && products.length > 0 && (
                    <div ref={ref}>
                        {products.length >= productsCount ? (
                            <div>No more products to load</div>
                        ) : (
                            <div>Scroll down to load more...</div>
                        )}
                    </div>
                )}
            </main>
        </>
    );
};

export default ListProducts;
