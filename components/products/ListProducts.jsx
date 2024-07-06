"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import ReclamItem from "./ReclamItem";
import cl from "./ListProducts.module.css";
import { useInView } from "react-intersection-observer";
import queryString from "query-string";

const ListProducts = ({ data, searchParams }) => {
    const [offset, setOffset] = useState(
        Number(process.env.NUMDER_OF_PRODUCTS)
    );
    const [products, setProducts] = useState(data?.products);
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const loadMoreProducts = async () => {
        const urlParams = {
            keyword: searchParams.keyword,
            page: searchParams.page,
            limit: process.env.NUMDER_OF_PRODUCTS,
            offset: offset,
            forceRefresh: false,
            category: searchParams.category,
            "price[gte]": searchParams.min,
            "price[lte]": searchParams.max,
            "ratings[gte]": searchParams.ratings,
        };

        const searchQuery = queryString.stringify(urlParams);

        try {
            const apiProducts = await axios.get(
                `${process.env.API_URL}/api/products?${searchQuery}`
            );

            setProducts([...products, ...apiProducts.data.products]);
            setOffset(offset + Number(process.env.NUMDER_OF_PRODUCTS));
        } catch (error) {
            console.error("Error loading more products:", error);
        }
    };

    useEffect(() => {
        if (inView && data.productsCount > products.length) {
            loadMoreProducts();
        }
    }, [inView]);

    return (
        <>
            <main className={cl.listProduct}>
                {products.map((product) =>
                    product?.advertiser ? (
                        <ReclamItem key={product?._id} product={product} />
                    ) : (
                        <ProductItem key={product?._id} product={product} />
                    )
                )}
                {data.productsCount > products.length && (
                    <div ref={ref}>Loading more...</div>
                )}
            </main>
        </>
    );
};

export default ListProducts;
