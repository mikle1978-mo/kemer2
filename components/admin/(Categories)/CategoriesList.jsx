"use client";

import React, { useContext } from "react";
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
    if (!categories && !deleteCategory) {
        throw new Error(" components admin ads CategoryList ошибка контекста");
    }

    const router = useRouter();

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
                <table className='table'>
                    <thead className='table_head'>
                        <tr>
                            <th scope='col' className='th'>
                                Название
                            </th>
                            <th scope='col' className='th'>
                                Родитель
                            </th>
                            <th scope='col' className='th'>
                                URI
                            </th>
                            <th scope='col' className='th'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((category) => (
                            <tr key={category._id} className='tr'>
                                <td className='td'>{category?.name}</td>
                                <td className='td'>{category?.parent}</td>
                                <td className='td'>{category?.uri}</td>
                                <td className='td'>
                                    <div className='btn_wrap'>
                                        <MyIconButton
                                            type='button'
                                            style={{ color: "#d97706" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href = `/me/admin/categories/${category?._id}`;
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
            <Link href='/me/admin/categories/new'>
                <MyButton>
                    <FontAwesomeIcon icon={faPlus} className='icon' /> Добавить
                    новую категорию
                </MyButton>
            </Link>
        </>
    );
};

export default CategoryList;
