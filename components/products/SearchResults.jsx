import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./MainList.css";
import { useInView } from "react-intersection-observer";
import { shuffleArray } from "@/helpers/helpers";

export default function SearchResults({ data }) {
    const products = Array.isArray(data?.products) ? data.products : [];
    const [items, setItems] = useState(
        products.length > 0 ? shuffleArray(products) : []
    );

    const [visibleItems, setVisibleItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setItems(products.length > 0 ? shuffleArray(products) : []);
    }, [data]); // Update items when data changes

    useEffect(() => {
        setVisibleItems(items.slice(0, 10));
    }, [items]);

    const { ref, inView } = useInView({
        threshold: typeof window !== "undefined" ? 300 / window.innerHeight : 0,
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
        if (inView && visibleItems.length < items.length) {
            loadMoreProducts();
        }
    }, [inView]);

    return (
        <main className='listProduct'>
            {loading && <div>Загрузка...</div>}

            {visibleItems.length > 0 ? (
                <>
                    {visibleItems.map((item) => (
                        <ProductItem key={item._id} product={item} />
                    ))}

                    <div ref={ref}>
                        {visibleItems.length >= items.length ? (
                            <div>Пока это всё 🤷‍♂️</div>
                        ) : (
                            <div>Листайте дальше...</div>
                        )}
                    </div>
                </>
            ) : (
                <div>Продукты пока не добавлены</div>
            )}
        </main>
    );
}
