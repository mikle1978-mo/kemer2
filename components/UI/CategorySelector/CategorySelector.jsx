"use client";

import React, { useState, useContext, useEffect } from "react";
import CategoryContext from "@/context/CategoryContext";
import cl from "./CategorySelector.module.css";
import { getSlugName } from "@/helpers/helpers";

export default function CategorySelector({ onCategoryChange }) {
    const { categories } = useContext(CategoryContext); // Получаем категории из контекста
    const [categoryTree, setCategoryTree] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории
    const [selectedCategoryNames, setSelectedCategoryNames] = useState([]); // Состояние для имён категорий

    useEffect(() => {
        // Функция для построения дерева категорий
        const buildCategoryTree = (parentSlug = null) => {
            return categories
                .filter((category) =>
                    parentSlug === null
                        ? category.slug.length === 1 // Корневые категории
                        : category.slug.length === parentSlug.length + 1 &&
                          category.slug
                              .slice(0, parentSlug.length)
                              .join("/") === parentSlug.join("/")
                )
                .map((category) => ({
                    ...category,
                    children: buildCategoryTree(category.slug),
                }));
        };

        // Строим дерево с корневого уровня
        const tree = buildCategoryTree();
        setCategoryTree(tree);
    }, [categories]);

    // Функция для обработки выбора категории
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        // Найти все категории, слаги которых полностью совпадают с выбранной категорией
        const findCategoryNames = (slug) => {
            return categories
                .filter(
                    (cat) =>
                        cat.slug.length === slug.length &&
                        cat.slug.every((s, i) => s === slug[i])
                )
                .map((cat) => cat.name);
        };

        const names = findCategoryNames(category.slug);
        setSelectedCategoryNames(names);
        onCategoryChange(category.slug);
    };

    // Функция для рендера дерева категорий
    const renderCategoryTree = (nodes) => {
        return (
            <ul>
                {nodes.map((node) => (
                    <li
                        key={node._id}
                        onClick={(e) => {
                            e.stopPropagation(); // Остановить всплытие события
                            handleCategoryClick(node);
                        }}
                        className={cl.categoryItem}
                    >
                        {node.name}
                        {node.children && node.children.length > 0 && (
                            <span className={cl.icon}>&rarr;</span> // Добавляем стрелку
                        )}
                        {node.children &&
                            node.children.length > 0 &&
                            renderCategoryTree(node.children)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className={cl.wrapper}>
            <div className={cl.categorySelector}>
                <div>Выберите категорию</div>
                <>
                    {categoryTree.length > 0 ? (
                        renderCategoryTree(categoryTree)
                    ) : (
                        <div>Загрузка категорий...</div>
                    )}
                </>
            </div>
            <div className={cl.selectedCategory}>
                {selectedCategory ? (
                    <>
                        <div>
                            Выбраннo:{" "}
                            {selectedCategory?.slug?.map((item) => (
                                <span key={item._id}>{getSlugName(item)} </span>
                            ))}
                        </div>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
