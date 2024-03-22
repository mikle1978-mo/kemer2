import React from "react";
import Image from "next/image";
import cl from "./OrderItem.module.css";
import { mark } from "@/lib/const/const";

const OrderItem = ({ order }) => {
    return (
        <article className={cl.wrap}>
            <header className={cl.header}>
                <div className={cl.header_wrap}>
                    <p className={cl.order_info}>
                        <span>Заказ ID: {order?._id} </span>
                        {order?.orderStatus == "В процессе" ? (
                            <span className={cl.status_red}>
                                • {order?.orderStatus.toUpperCase()}
                            </span>
                        ) : (
                            <span className={cl.status_green}>
                                • {order?.orderStatus.toUpperCase()}
                            </span>
                        )}
                    </p>
                    <p className={cl.order_date}>
                        {order?.createAt?.substring(0, 10)}{" "}
                    </p>
                </div>
            </header>
            <div className={cl.person_wrap}>
                <div>
                    <p className={cl.info_title}>Заказчик</p>
                    <ul className={cl.info_ul}>
                        <li>{order?.user?.name}</li>
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
                    <p className={cl.info_title}>Оплата</p>
                    <ul className={cl.info_ul}>
                        <li className={cl.payment_status}>
                            {order?.paymentInfo?.status?.toUpperCase()}
                        </li>
                        <li>
                            НДС: {mark}
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

            <div className={cl.img_wrap}>
                {order?.orderItems?.map((item) => (
                    <figure key={item._id} className={cl.figure}>
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
                        <figcaption className={cl.figcaption}>
                            <p>{item.name.substring(0, 35)}</p>
                            <p className={cl.total}>
                                {item.quantity}x = ${item.price * item.quantity}
                            </p>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </article>
    );
};

export default OrderItem;
