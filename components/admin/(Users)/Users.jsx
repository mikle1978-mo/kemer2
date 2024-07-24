"use client";

import React, { useContext, useEffect } from "react";
// import CustomPagination from "../layouts/CustomPagination";
import AuthContext from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import cl from "./Users.module.css";
import MyIconButton from "../../UI/myButton/myIconButton";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Users = ({ data }) => {
    const { error, deleteUser, clearErrors } = useContext(AuthContext);
    if (!error && !deleteUser && !clearErrors) {
        throw new Error(" components admin Users ошибка контекста");
    }

    const router = useRouter();

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    const deleteHandler = (id) => {
        if (confirm("Удалить пользователя?")) {
            deleteUser(id);
            toast.success("Пользователь удален!");
        }
    };

    return (
        <div className={cl.wrap}>
            <h1 className={cl.title}>
                {data?.users?.length} Пользователей на странице
            </h1>
            <table className={cl.table}>
                <thead className={cl.table_head}>
                    <tr>
                        <th scope='col' className={cl.th}>
                            Имя
                        </th>
                        <th scope='col' className={cl.th}>
                            Email
                        </th>
                        <th scope='col' className={cl.th}>
                            Роль
                        </th>
                        <th scope='col' className={cl.th}>
                            {" "}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.users?.map((user) => (
                        <tr key={user?._id} className={cl.tr}>
                            <td className={cl.td}>{user?.name}</td>
                            <td className={cl.td}>{user?.email}</td>
                            <td className={cl.td}>{user?.role}</td>
                            <td className={cl.td}>
                                <div className={cl.btn_wrap}>
                                    <MyIconButton
                                        type='button'
                                        style={{ color: "#d97706" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/me/admin/users/${user?._id}`;
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPencil} />
                                    </MyIconButton>

                                    <MyIconButton
                                        style={{ color: "red" }}
                                        onClick={() => deleteHandler(user?._id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </MyIconButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <div className='mb-6'>
                <CustomPagination
                    resPerPage={data?.resPerPage}
                    productsCount={data?.usersCount}
                />
            </div> */}
        </div>
    );
};

export default Users;
