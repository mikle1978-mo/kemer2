"use client";
import React from "react";
import { useState } from "react";
import SubHeading from "../subheading/SubHeading";
import "./Newsletter.css";

const TLGMessage = function (order) {
    console.log(order);
    if (order) {
        let message = `<b>Заявка с сайта Canion!</b>\n`;
        message += `<b>email: </b>${order.mail}\n`;

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
        mail: "",
    });

    const { mail } = message;

    const onChange = (e) => {
        setMessage({ ...message, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        TLGMessage(message);
    };

    return (
        <div className='app__newsletter'>
            <div className='app__newsletter-heading'>
                <SubHeading title='Новостная лента' />
                <h1 className='headtext__cormorant'>
                    Подпишись на нашу ленту новостей
                </h1>
                <p className='p__opensans'>
                    И никогда не пропускайте последние обновления!
                </p>
            </div>

            <form
                className='app__newsletter-input flex__center'
                onSubmit={submitHandler}
            >
                <input
                    type='email'
                    placeholder='Введите Ваш email'
                    name='mail'
                    value={mail}
                    onChange={onChange}
                />
                <button type='submit' className='custom__button'>
                    Подписаться
                </button>
            </form>
        </div>
    );
}
