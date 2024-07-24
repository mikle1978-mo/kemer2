"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import NavigationContext from "@/context/NavigationContext";
import CategoryContext from "@/context/CategoryContext";
import Search from "../Search";
import "./Navigation.css";

const Navigation = () => {
    const { categories, setCategories } = useContext(CategoryContext);
    const { open, setOpen } = useContext(NavigationContext);
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [breadcrumb, setBreadcrumb] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(
                    `${process.env.API_URL}/api/categories`
                );
                const data = await res.json();
                setCategories(data.categories);
                setItems(data.categories.filter((item) => !item.parent));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [setCategories]);

    const handler = (category) => {
        const subcategories = categories.filter(
            (item) => item.parent === category.uri
        );

        if (subcategories.length > 0) {
            setBreadcrumb((prevBreadcrumb) => [
                ...prevBreadcrumb,
                { id: category._id, name: category.name, items },
            ]);
            setItems(subcategories);
        } else {
            router.push(`/catalog/category/${category._id}`);
            setOpen(!open);
        }
    };

    const handleBack = () => {
        const previous = breadcrumb.pop();
        setItems(previous.items);
        setBreadcrumb([...breadcrumb]);
    };

    return (
        <aside className={open ? "navigation" : "none"}>
            <div className='search'>
                <Search name={"navigation"} />
            </div>
            {breadcrumb.length > 0 && (
                <button onClick={handleBack} className='buttonBack'>
                    <FontAwesomeIcon icon={faChevronLeft} />{" "}
                    {breadcrumb[breadcrumb.length - 1].name}
                </button>
            )}
            <ul className='categoryList'>
                {items.map((item) => {
                    const hasSubcategories = categories.some(
                        (cat) => cat.parent === item.uri
                    );

                    return (
                        <li
                            key={item._id}
                            className='category'
                            onClick={() => handler(item)}
                        >
                            <span className='text'>
                                {item.name}
                                {hasSubcategories && (
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                    </span>
                                )}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Navigation;
