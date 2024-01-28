"use client"

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import OrderContext from "@/context/OrderContext";
import Image from "next/image";
import { mark } from "@/lib/const/const";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import TGMessage from "@/backend/utils/tgMessage";
import PayingInfo from "./PayingInfo";



const Paying = () => {
    const { tempOrder } = useContext(OrderContext);
    const router = useRouter()

    const order = tempOrder.orderData;
    console.log(order);

    const newOrderHandler = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.API_URL}/api/orders/createOrder`,
                order
            );

            if (data) {
                TGMessage(order)
                toast.success("Заказ успешно отправлен, ожидайте доставки");
                router.push("/me/orders?order_success=true")
            }

        } catch (error) {
            console.log(error);
        }
    };



    return (
        <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
            <header className="lg:flex justify-between mb-4">
                <div className="mb-4 lg:mb-0">
                    <p className="font-semibold">
                        <span>Проверьте данные заказа и нажмите кнопку заказать: {order?._id} </span>
                        {order?.orderStatus == "Processing" ? (
                            <span className="text-red-500">
                                • {order?.orderStatus?.toUpperCase()}
                            </span>
                        ) : (
                            <span className="text-green-500">
                                • {order?.orderStatus?.toUpperCase()}
                            </span>
                        )}
                    </p>
                    <p className="text-gray-500">{order?.createAt?.substring(0, 10)} </p>
                </div>
            </header>
            <div className="grid md:grid-cols-3 gap-2">
                <div>
                    <p className="text-gray-400 mb-1">Заказчик</p>
                    <ul className="text-gray-600">
                        <li>Имя: {" "}{order?.user?.name}</li>
                        <li>Тел: {" "}{order?.shippingInfo?.phoneNo}</li>
                        <li>Email: {" "}{order?.user?.email}</li>
                    </ul>
                </div>
                <div>
                    <p className="text-gray-400 mb-1">Адрес доставки</p>
                    <ul className="text-gray-600">
                        <li>{order?.shippingInfo?.street}</li>
                        <li>
                            {order?.shippingInfo?.city}, {order?.shippingInfo?.state},{" "}
                            {order?.shippingInfo?.zipCode}
                        </li>
                        <li>{order?.shippingInfo?.country}</li>
                    </ul>
                </div>
                <div>
                    <p className="text-gray-400 mb-1">Платежная информация</p>
                    <ul className="text-gray-600">
                        <li className="text-400">Оплата:{" "}
                            {order?.paymentInfo?.method}
                        </li>
                        <li className="text-green-400">
                            {order?.paymentInfo?.status?.toUpperCase()}
                        </li>

                        <li>Налог: {" "}{mark}{order?.paymentInfo?.taxPaid}</li>
                        <li>Итого: {" "}{mark}{order?.paymentInfo?.amountPaid}</li>
                    </ul>
                </div>
            </div>

            <hr className="my-4" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {order?.orderItems?.map((item) => (
                    <figure className="flex flex-row mb-4" key={item?.product}>
                        <div>
                            <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                                <Image
                                    src={item?.image}
                                    height="60"
                                    width="60"
                                    alt={item.name}
                                />
                            </div>
                        </div>
                        <figcaption className="ml-3">
                            <p>{item.name.substring(0, 35)}</p>
                            <p className="mt-1 font-semibold">
                                {item.quantity}шт = {mark}{item.price * item.quantity}
                            </p>
                        </figcaption>
                    </figure>
                ))}
            </div>
            {order?.paymentInfo?.method === "Сразу" ? (
                <PayingInfo />
            ) : (
                <div />
            )}

            <div className="flex justify-end space-x-2 mt-10">
                <Link
                    href="/shipping"
                    className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                >
                    Назад
                </Link>
                <a
                    className="px-5 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                    onClick={newOrderHandler}
                >
                    Заказать
                </a>
            </div>
        </article>
    );
};

export default Paying;
