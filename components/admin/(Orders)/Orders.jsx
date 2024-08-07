"use client";


import React, { useContext, useEffect } from "react";
// import CustomPagination from "../layouts/CustomPagination";
import OrderContext from "@/context/OrderContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import cl from "./Orders.module.css";
import MyIconButton from "../../UI/myButton/myIconButton";
import { toast } from "react-toastify";

const Orders = ({ orders }) => {
    const { deleteOrder, error, clearErrors } = useContext(OrderContext);
    if (!deleteOrder && !clearErrors && !error) {
        throw new Error(" components Orders ошибка контекста");
    }

    const router = useRouter();

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    useEffect(() => {
        router.refresh();
    }, [orders]);

    const deleteHandler = (id) => {
        if (confirm("Удалить заказ?")) {
            deleteOrder(id);
            toast.success("Заказ удален!");
        }
    };
    return (
        <div className={cl.wrap}>
            <h1 className={cl.title}>
                Количество заказов {orders?.ordersCount}{" "}
            </h1>
            <table className={cl.table}>
                <thead className={cl.table_head}>
                    <tr>
                        <th scope='col' className={cl.th}>
                            ID
                        </th>
                        <th scope='col' className={cl.th}>
                            Дата
                        </th>
                        <th scope='col' className={cl.th}>
                            User
                        </th>
                        <th scope='col' className={cl.th}>
                            ₽
                        </th>
                        <th scope='col' className={cl.th}>
                            Статус
                        </th>
                        <th scope='col' className={cl.th}>
                            Ред
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.orders?.map((order) => (
                        <tr key={order._id} className={cl.tr}>
                            <td className={cl.td}>{order?._id}</td>
                            <td className={cl.td}>
                                {new Date(order?.createAt).toLocaleDateString(
                                    "ru",
                                    {
                                        // weekday: "",
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                    }
                                )}
                            </td>
                            <td className={cl.td}>{order?.user.name}</td>
                            <td className={cl.td}>
                                ${order?.paymentInfo?.amountPaid}
                            </td>
                            <td className={cl.td}>{order?.orderStatus}</td>
                            <td className={cl.td}>
                                <div className={cl.btn_wrap}>
                                    <MyIconButton
                                        type='button'
                                        style={{ color: "#d97706" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/me/admin/orders/${order?._id}`;
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPencil} />
                                    </MyIconButton>
                                    <MyIconButton
                                        style={{ color: "red" }}
                                        onClick={() =>
                                            deleteHandler(order?._id)
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

            {/* <div className='mb-6'>
                <CustomPagination
                    resPerPage={orders?.resPerPage}
                    productsCount={orders?.ordersCount}
                />
            </div> */}
        </div>
    );
};

export default Orders;
