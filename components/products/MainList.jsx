"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./MainList.css";
import { useInView } from "react-intersection-observer";
import { shuffleArray } from "@/helpers/helpers";

export default function MainList({ data }) {
    const [items, setItems] = useState(shuffleArray(data.products));
    const [itemsCount, setItemsCount] = useState(data.productsCount);
    const [visibleItems, setVisibleItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setVisibleItems(items.slice(0, 10));
    }, [items]);

    let threshold = 0;
    if (typeof window !== "undefined") {
        threshold = 500 / window.innerHeight;
    }

    const { ref, inView } = useInView({
        threshold: threshold,
        triggerOnce: false,
    });

    const loadMoreProducts = () => {
        setVisibleItems((prevVisibleItems) => {
            const nextItems = items.slice(
                prevVisibleItems.length,
                prevVisibleItems.length + 10
            );
            return [...prevVisibleItems, ...nextItems];
        });
    };

    useEffect(() => {
        if (inView && visibleItems.length < itemsCount) {
            loadMoreProducts();
        }
    }, [inView]);

    return (
        <main className='listProduct'>
            {loading && <div>Загрузка...</div>}
            {visibleItems.map((item) => (
                <ProductItem key={item._id} product={item} />
            ))}

            {visibleItems.length > 0 && (
                <div ref={ref}>
                    {visibleItems.length >= itemsCount ? (
                        <div>Пока это всё 🤷‍♂️</div>
                    ) : (
                        <div>Листайте дальше...</div>
                    )}
                </div>
            )}
        </main>
    );
}
