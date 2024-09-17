import React from "react";
import cl from "./OrderItem.module.css";
import { mark } from "@/lib/const/const";

const OrderItem = ({ order }) => {
    return (
        <article className={cl.wrap}>
            <div className={cl.card}>
                <span className={cl.line}>
                    <p>Заказ </p>
                    <p>
                        от {order?.createAt?.substring(0, 10)} №
                        {order?._id.substring(0, 6)}
                    </p>
                </span>

                <span className={cl.line}>
                    <p>на сумму:</p>
                    <p>
                        {mark}
                        {order?.paymentInfo?.amountPaid}
                    </p>
                </span>
                {order?.orderStatus == "В процессе" ? (
                    <span className={cl.line}>
                        <p>Состояние: </p>
                        <span className={cl.status_red}>
                            • {order?.orderStatus.toUpperCase()}
                        </span>
                    </span>
                ) : (
                    <span className={cl.line}>
                        <p>Состояние: </p>
                        <span className={cl.status_green}>
                            • {order?.orderStatus.toUpperCase()}
                        </span>
                    </span>
                )}
                <details className={cl.details}>
                    <summary className={cl.summary}>Детали заказа</summary>

                    <div className={cl.desc}>
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
                                    Стоимость: {mark}
                                    {order?.paymentInfo?.amountPaid}
                                </li>
                                <li>
                                    Доставка: {mark}
                                    {order?.paymentInfo?.deliveryPaid}
                                </li>
                                <li>
                                    Итого: {mark}
                                    {order?.paymentInfo?.totalPaid}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr className='hr' />

                    <div className={cl.products}>
                        {order?.orderItems?.map((item) => (
                            <figure key={item._id} className={cl.figure}>
                                <img
                                    src={item?.image}
                                    alt={item.name}
                                    className={cl.productImg}
                                />
                                <figcaption className={cl.figcaption}>
                                    <p>{item.name.substring(0, 35)}</p>
                                    <p className={cl.total}>
                                        {item.quantity}x = $
                                        {item.price * item.quantity}
                                    </p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </details>
            </div>
        </article>
    );
};

export default OrderItem;
