"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import OrderContext from "@/context/OrderContext";
import Image from "next/image";
import { mark } from "@/lib/const/const";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import TGMessage from "@/backend/utils/tgMessage";
import PayingInfo from "./PayingIBAN";
import cl from "./Paying.module.css";
import MyButton from "../UI/myButton/myButton";
import PayingIBAN from "./PayingIBAN";
import PayingCripto from "./PayingCripto";

const Paying = () => {
    const { tempOrder } = useContext(OrderContext);
    const router = useRouter();

    const order = tempOrder.orderData;

    const newOrderHandler = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.API_URL}/api/orders/createOrder`,
                order
            );

            if (data) {
                TGMessage(order);
                toast.success("Заказ успешно отправлен, ожидайте доставки");
                router.push("/me/orders?order_success=true");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h3 className='title'> Проверьте данные заказа</h3>

            <div className={cl.info_wrap}>
                <div>
                    <p className={cl.info_title}>Заказчик</p>
                    <ul className={cl.info_ul}>
                        <li>Имя: {order?.user?.name}</li>
                        <li>Тел: {order?.shippingInfo?.phoneNo}</li>
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
                        <li>Оплата: {order?.paymentInfo?.method}</li>
                        <li className={cl.paying_status}>
                            {order?.paymentInfo?.status?.toUpperCase()}
                        </li>

                        <li>
                            Налог: {mark}
                            {order?.paymentInfo?.taxPaid}
                        </li>
                        <li>
                            Итого: {mark}
                            {order?.paymentInfo?.amountPaid}
                        </li>
                    </ul>
                </div>
            </div>

            <hr className={cl.hr} />

            <div className={cl.product_card_small}>
                {order?.orderItems?.map((item) => (
                    <figure className={cl.figure} key={item?.product}>
                        <div>
                            <div className={cl.img_wrap}>
                                <Image
                                    src={item?.image}
                                    height='60'
                                    width='60'
                                    alt={item.name}
                                />
                            </div>
                        </div>
                        <figcaption className={cl.figcaption}>
                            <p>{item.name.substring(0, 35)}</p>
                            <p className={cl.figcaption_info}>
                                {item.quantity}шт = {mark}
                                {item.price * item.quantity}
                            </p>
                        </figcaption>
                    </figure>
                ))}
            </div>
            {order?.paymentInfo?.method === "По номеру IBAN" ? (
                <PayingIBAN />
            ) : (
                <div />
            )}
            {order?.paymentInfo?.method === "Крипто" ? (
                <PayingCripto />
            ) : (
                <div />
            )}

            <div className={cl.btn_wrap}>
                <MyButton
                    type='button'
                    style={{ backgroundColor: "gray" }}
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/shipping`;
                    }}
                >
                    назад
                </MyButton>
                <MyButton
                    type='button'
                    style={{ backgroundColor: "green" }}
                    onClick={newOrderHandler}
                >
                    заказать
                </MyButton>
            </div>
        </>
    );
};

export default Paying;
