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
import { byField } from "@/helpers/helpers";

// Функция для получения полного пути категории (не изменяется)
const getFullCategoryPath = (categorySlug, categories) => {
    const path = [];
    let currentCategory = categories.find(
        (cat) => cat.slug.join("/") === categorySlug.join("/")
    );

    while (currentCategory) {
        path.unshift(currentCategory);
        currentCategory = categories.find((cat) =>
            currentCategory.parent
                ? cat.slug.join("/") === currentCategory.parent.join("/")
                : false
        );
    }
    console.log(path);

    return path;
};

const Navigation = () => {
    const { categories } = useContext(CategoryContext); // Получаем категории из контекста
    const { open, setOpen } = useContext(NavigationContext);
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [breadcrumb, setBreadcrumb] = useState([]); // Хлебные крошки для хранения пути

    useEffect(() => {
        // Первоначальная фильтрация категорий верхнего уровня (у которых длина slug == 1)
        const initialItems = categories
            .filter((item) => item.slug.length === 1)
            .sort(byField("name"));
        setItems(initialItems);
    }, [categories]);

    // Обработка выбора категории
    const handler = (category) => {
        const subcategories = categories.filter(
            (item) =>
                item.slug.length === category.slug.length + 1 && // Количество элементов в slug увеличивается на 1
                item.slug.slice(0, category.slug.length).join("/") ===
                    category.slug.join("/") // Сравниваем начальные элементы slug
        );

        if (subcategories.length > 0) {
            // Добавляем категорию в хлебные крошки и отображаем подкатегории
            setBreadcrumb((prevBreadcrumb) => [
                ...prevBreadcrumb,
                {
                    id: category._id,
                    name: category.name,
                    slug: category.slug,
                    items,
                },
            ]);
            setItems(subcategories.sort(byField("name"))); // Устанавливаем подкатегории для отображения
        } else {
            const fullPath = getFullCategoryPath(category.slug, categories)
                .map((cat) => cat.slug.join("/"))
                .join("/");

            // Переход на полный путь
            router.push(`/catalog/category/${fullPath}`);

            // Сбрасываем категории на верхний уровень после перехода
            const topLevelCategories = categories
                .filter((item) => item.slug.length === 1)
                .sort(byField("name"));
            setItems(topLevelCategories);
            setBreadcrumb([]); // Очищаем хлебные крошки
            setOpen(false); // Закрываем навигацию
        }
    };

    // Обработка возврата к родителю
    const handleBack = () => {
        if (breadcrumb.length === 0) return;

        const newBreadcrumb = [...breadcrumb];
        const previous = newBreadcrumb.pop(); // Убираем последний элемент из хлебных крошек

        if (previous) {
            setItems(previous.items); // Устанавливаем предыдущие элементы
            setBreadcrumb(newBreadcrumb); // Обновляем хлебные крошки
        } else {
            // Если хлебные крошки пусты, возвращаемся к категориям верхнего уровня
            const topLevelCategories = categories
                .filter((item) => item.slug.length === 1)
                .sort(byField("name"));
            setItems(topLevelCategories);
        }
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
                        (cat) =>
                            cat.slug.length === item.slug.length + 1 &&
                            cat.slug.slice(0, item.slug.length).join("/") ===
                                item.slug.join("/")
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
