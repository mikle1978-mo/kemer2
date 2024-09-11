"use client";

import React, { useContext, useState } from "react";
import CategoryContext from "@/context/CategoryContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../admin.css";
import MyIconButton from "../../UI/myButton/myIconButton";
import MyButton from "../../UI/myButton/myButton";
import Link from "next/link";

const CategoryList = () => {
    const { categories, deleteCategory } = useContext(CategoryContext);
    const [sortConfig, setSortConfig] = useState({
        key: "name",
        direction: "ascending",
    });
    const router = useRouter();

    if (!categories || !deleteCategory) {
        throw new Error(" components admin CategoryList ошибка контекста");
    }

    const sortedCategories = [...categories].sort((a, b) => {
        if (sortConfig.key === "parent") {
            // Custom sorting for 'parent' field, considering null and 0
            const aParent = a.parent ?? 0;
            const bParent = b.parent ?? 0;
            if (aParent === null)
                return sortConfig.direction === "ascending" ? -1 : 1;
            if (bParent === null)
                return sortConfig.direction === "ascending" ? 1 : -1;
            if (aParent === 0)
                return sortConfig.direction === "ascending" ? -1 : 1;
            if (bParent === 0)
                return sortConfig.direction === "ascending" ? 1 : -1;
            if (aParent < bParent)
                return sortConfig.direction === "ascending" ? -1 : 1;
            if (aParent > bParent)
                return sortConfig.direction === "ascending" ? 1 : -1;
        } else {
            // Default sorting for other fields
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? 1 : -1;
            }
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const deleteHandler = (id) => {
        if (confirm("Удалить категорию?")) {
            deleteCategory(id);
            toast.success("Категория удалена");
            router.refresh();
        }
    };

    return (
        <>
            <div className='wrap'>
                <h1 className='title'>Категории</h1>
                <Link href='/me/admin/categories/new'>
                    <MyButton>
                        <FontAwesomeIcon icon={faPlus} className='icon' />{" "}
                    </MyButton>
                </Link>
                <table className='table'>
                    <thead className='table_head'>
                        <tr>
                            <th
                                scope='col'
                                className='th'
                                onClick={() => handleSort("name")}
                            >
                                Название
                                {sortConfig.key === "name" &&
                                    (sortConfig.direction === "ascending"
                                        ? " 🔼"
                                        : " 🔽")}
                            </th>
                            <th
                                scope='col'
                                className='th'
                                onClick={() => handleSort("description")}
                            >
                                Описание
                                {sortConfig.key === "description" &&
                                    (sortConfig.direction === "ascending"
                                        ? " 🔼"
                                        : " 🔽")}
                            </th>
                            <th
                                scope='col'
                                className='th'
                                onClick={() => handleSort("slug")}
                            >
                                SLUG
                                {sortConfig.key === "slug" &&
                                    (sortConfig.direction === "ascending"
                                        ? " 🔼"
                                        : " 🔽")}
                            </th>
                            <th scope='col' className='th'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCategories.map((category) => (
                            <tr key={category._id} className='tr'>
                                <td className='td'>{category?.name}</td>
                                <td className='td'>{category?.description}</td>
                                <td className='td'>
                                    {category?.slug.join(" > ")}
                                </td>
                                <td className='td'>
                                    <div className='btn_wrap'>
                                        <MyIconButton
                                            type='button'
                                            style={{ color: "#d97706" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.push(
                                                    `/me/admin/categories/${category?._id}`
                                                );
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPencil} />
                                        </MyIconButton>
                                        <MyIconButton
                                            style={{ color: "red" }}
                                            onClick={() =>
                                                deleteHandler(category?._id)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </MyIconButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CategoryList;
