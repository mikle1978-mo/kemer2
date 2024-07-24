"use client";

import React, { useContext, useEffect } from "react";
import SellerContext from "@/context/SellerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../admin.css";
import MyIconButton from "../../UI/myButton/myIconButton";
import { toast } from "react-toastify";
import Link from "next/link";
import MyButton from "../../UI/myButton/myButton";

const Sellers = ({ data }) => {
    const { error, deleteSeller, clearErrors } = useContext(SellerContext);
    if (!error && !deleteSeller && !clearErrors) {
        throw new Error(" components admin Sellers ошибка контекста");
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    const deleteHandler = (id) => {
        if (confirm("Удалить пользователя?")) {
            deleteSeller(id);
            toast.success("Пользователь удален!");
        }
    };

    return (
        <>
            <div className='wrap'>
                <h1 className='title'>
                    {data?.sellerss?.length} Продавцов на странице
                </h1>
                <table className='table'>
                    <thead className='table_head'>
                        <tr>
                            <th scope='col' className='th'>
                                Имя
                            </th>
                            <th scope='col' className='th'>
                                Email
                            </th>
                            <th scope='col' className='th'>
                                PhoneNo
                            </th>
                            <th scope='col' className='th'>
                                Address
                            </th>
                            <th scope='col' className='th'>
                                {" "}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.sellers?.map((seller) => (
                            <tr key={seller?._id} className='tr'>
                                <td className='td'>{seller?.name}</td>
                                <td className='td'>{seller?.email}</td>
                                <td className='td'>{seller?.phoneNo}</td>
                                <td className='td'>{seller?.address}</td>
                                <td className='td'>
                                    <div className='btn_wrap'>
                                        <MyIconButton
                                            type='button'
                                            style={{ color: "#d97706" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href = `/me/admin/sellers/${seller?._id}`;
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPencil} />
                                        </MyIconButton>

                                        <MyIconButton
                                            style={{ color: "red" }}
                                            onClick={() =>
                                                deleteHandler(seller?._id)
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
            <Link href='/me/admin/sellers/new'>
                <MyButton>
                    <FontAwesomeIcon icon={faPlus} className='icon' /> Добавить
                    нового продавца
                </MyButton>
            </Link>
        </>
    );
};

export default Sellers;
