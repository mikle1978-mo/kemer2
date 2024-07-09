"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import ReclamItem from "./ReclamItem";
import cl from "./ListProducts.module.css";
import { useInView } from "react-intersection-observer";
import queryString from "query-string";

export const dynamic = "force-dinamic";

export const ListProducts = ({ searchParams }) => {
    const [offset, setOffset] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [productsLoaded, setProductsLoaded] = useState(false); // Новое состояние для отслеживания загрузки продуктов
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const prevSearchParams = useRef({});

    useEffect(() => {
        if (
            JSON.stringify(prevSearchParams.current) !==
            JSON.stringify(searchParams)
        ) {
            setOffset(0);
            setProducts([]);
            setProductsCount(0);
            setProductsLoaded(false); // Сбрасываем состояние загрузки продуктов
            prevSearchParams.current = searchParams;
            fetchProducts(true, 0); // Передаем true для forceRefresh и сбрасываем offset на 0
        }
    }, [searchParams]);

    const fetchProducts = async (forceRefresh = false, newOffset = offset) => {
        const limit = process.env.NUMBER_OF_PRODUCTS || 10;

        const urlParams = {
            keyword: searchParams.keyword || undefined,
            page: searchParams.page || undefined,
            limit: limit,
            offset: newOffset,
            forceRefresh: forceRefresh,
            category: searchParams.category || undefined,
            "price[gte]": searchParams.min || undefined,
            "price[lte]": searchParams.max || undefined,
            "ratings[gte]": searchParams.ratings || undefined,
        };

        const filteredParams = Object.fromEntries(
            Object.entries(urlParams).filter(
                ([_, value]) => value !== undefined
            )
        );

        const searchQuery = queryString.stringify(filteredParams);

        try {
            setLoading(true);
            const apiProducts = await axios.get(
                `${process.env.API_URL}/api/products?${searchQuery}`
            );

            setProducts((prevProducts) => [
                ...prevProducts,
                ...apiProducts.data.products.filter(
                    (newProduct) =>
                        !prevProducts.some(
                            (existingProduct) =>
                                existingProduct._id === newProduct._id
                        )
                ),
            ]);

            setOffset(newOffset + apiProducts.data.products.length);
            setProductsCount(apiProducts.data.productsCount);
            setLoading(false);
            setProductsLoaded(true); // Устанавливаем состояние загрузки продуктов как выполненное
        } catch (error) {
            console.error("Error loading products:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            inView &&
            products.length > 0 &&
            !loading &&
            products.length < productsCount
        ) {
            fetchProducts(false, offset);
        }
    }, [inView, products.length, loading, productsCount]);

    useEffect(() => {
        fetchProducts(true, 0); // Fetch products initially when component mounts
    }, []);

    return (
        <>
            <main className={cl.listProduct}>
                {productsLoaded && products.length === 0 && !loading ? (
                    <div>Продукты не найдены.</div> // Отображаем только если продукты загружены и их нет
                ) : null}
                {products.length > 0
                    ? products.map((product) =>
                          product?.advertiser ? (
                              <ReclamItem
                                  key={product?._id}
                                  product={product}
                              />
                          ) : (
                              <ProductItem
                                  key={product?._id}
                                  product={product}
                              />
                          )
                      )
                    : null}
                {loading && (
                    <div className='roller_wrap'>
                        <div className='roller'></div>
                    </div>
                )}
                {!loading && products.length > 0 && (
                    <div ref={ref}>
                        {products.length >= productsCount ? (
                            <div>нет продуктов для загрузки</div>
                        ) : (
                            <div>листай дальше...</div>
                        )}
                    </div>
                )}
            </main>
        </>
    );
};

export default ListProducts;
