"use client";
import React from "react";
import { useState } from "react";
import SubHeading from "../subheading/SubHeading";
import "./Newsletter.css";
import { toast } from "react-toastify";

const TLGMessage = function (order) {
    if (order) {
        let message = `<b>Заявка с сайта Canion!</b>\n`;
        message += `<b>phone: </b>${order.phone}\n`;

        fetch(process.env.URI_API_TG, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                chat_id: process.env.CHAT_ID,
                parse_mode: "html",
                text: message,
            }),
        })
            .then((res) => {
                console.log("Запрос отрпавлен. Спасибо за обращение!");
            })
            .catch((err) => {
                console.log(err);
                console.log("Ошибка при отправке запроса! Попробуйте позже.");
            });
    }
};

export default function Newsletter() {
    const [message, setMessage] = useState({
        phone: "",
    });

    const { phone } = message;

    const onChange = (e) => {
        setMessage({ ...message, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        if (phone) {
            e.preventDefault();
            TLGMessage(message);
            setMessage({ phone: "" }); // Очистка состояния формы
            e.target.reset(); // Сброс формы
            toast.success("Телефон отправлен. Мы Вам скоро с вами свяжемся!");
        } else {
            e.preventDefault();
            toast.error("Введите номер телефона!");
        }
    };

    return (
        <div className='app__newsletter'>
            <div className='app__newsletter-heading'>
                <SubHeading title='Заказ столика' />
                <h2 className='headtext__cormorant'>Заказать столик</h2>
                <p className='p__opensans'>
                    Отрправьте Ваш телефон и мы Вам перезвоним, или позвоните
                    нам по телефону указанному ниже.
                </p>
            </div>

            <form
                className='app__newsletter-input flex__center'
                onSubmit={submitHandler}
            >
                <input
                    type='tel'
                    placeholder='Введите Ваш телефон'
                    name='phone'
                    value={phone}
                    onChange={onChange}
                />
                <button type='submit' className='custom__button'>
                    Заказать
                </button>
            </form>
        </div>
    );
}
