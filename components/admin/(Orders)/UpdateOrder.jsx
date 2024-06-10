"use client";

import OrderContext from "@/context/OrderContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import cl from "./UpdateOrder.module.css";
import MyButton from "../../UI/myButton/myButton";

const UpdateOrder = ({ order }) => {
    const { updateOrder, error, clearErrors, updated, setUpdated } =
        useContext(OrderContext);
    const router = useRouter();

    const [orderStatus, setOrderStatus] = useState(order?.orderStatus);

    useEffect(() => {
        if (updated) {
            setUpdated(false);
            toast.success("Заказ успешно обовлен");
            router.push("/admin/orders");
        }

        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error, updated]);

    const submitHandler = () => {
        const orderData = { orderStatus };

        updateOrder(order?._id, orderData);
    };

    return (
        <article className={cl.article}>
            <header className={cl.header}>
                <div className={cl.order_top}>
                    <p className='font-semibold'>
                        <span>Номер заказа: {order?._id} </span>
                        {order?.orderStatus == "В процессе" ? (
                            <span className={cl.status_red}>
                                • {order?.orderStatus.toUpperCase()}
                            </span>
                        ) : (
                            <span className={cl.status_green}>
                                • {order?.orderStatus?.toUpperCase()}
                            </span>
                        )}
                    </p>
                    <p className={cl.order_date}>
                        {order?.createAt?.substring(0, 10)}{" "}
                    </p>
                </div>
            </header>
            <div className={cl.middle_wrap}>
                <div>
                    <p className={cl.info_title}>Заказчик</p>
                    <ul className={cl.info_ul}>
                        <li>{order?.user?.name}</li>
                        <li>Phone: {order?.shippingInfo?.phoneNo}</li>
                        <li>Email: {order?.user?.email}</li>
                    </ul>
                </div>
                <div>
                    <p className={cl.info_title}>Адрес доставки</p>
                    <ul className={cl.info_ul}>
                        <li>{order?.shippingInfo?.street}</li>
                        <li>
                            {order?.shippingInfo?.city},{" "}
                            {order?.shippingInfo?.state},{" "}
                            {order?.shippingInfo?.zipCode}
                        </li>
                        <li>{order?.shippingInfo?.country}</li>
                    </ul>
                </div>
                <div>
                    <p className={cl.info_title}>Платежная информация</p>
                    <ul className={cl.info_ul}>
                        <li className={cl.info_payment}>
                            {order?.paymentInfo?.status?.toUpperCase()}
                        </li>
                        <li>НДС: ${order?.paymentInfo?.taxPaid}</li>
                        <li>Итого: ${order?.paymentInfo?.amountPaid}</li>
                    </ul>
                </div>
            </div>

            <hr className={cl.hr} />

            <div className={cl.img_wrap}>
                {order?.orderItems?.map((item) => (
                    <figure key={item._id} className={cl.img_figure}>
                        <div>
                            <div className={cl.img}>
                                <Image
                                    src={item?.image}
                                    height='60'
                                    width='60'
                                    alt={item.name}
                                />
                            </div>
                        </div>
                        <figcaption className={cl.img_figcaption}>
                            <p>{item.name.substring(0, 35)}</p>
                            <p className={cl.img_figcaption_total}>
                                {item.quantity}x = ${item.price * item.quantity}
                            </p>
                        </figcaption>
                    </figure>
                ))}
            </div>

            <hr />

            <div className={cl.bottom_wrap}>
                <label className={cl.bottom_label}>
                    {" "}
                    Обновить статус заказа
                    <div className={cl.relative}>
                        <select
                            className={cl.select}
                            name='category'
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            required
                        >
                            {["В процессе", "Отправлено", "Доставлено"].map(
                                (status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                )
                            )}
                        </select>
                        <i className={cl.arrow}>
                            <svg
                                width='22'
                                height='22'
                                className='fill-current'
                                viewBox='0 0 20 20'
                            >
                                <path d='M7 10l5 5 5-5H7z'></path>
                            </svg>
                        </i>
                    </div>
                </label>
            </div>

            <MyButton type='submit' onClick={() => submitHandler()}>
                Обновить
            </MyButton>
        </article>
    );
};

export default UpdateOrder;
