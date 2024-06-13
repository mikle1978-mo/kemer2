import React from "react";
import cl from "./about.module.css";
import LandingsContact from "@/components/landings/LandingsContact";

const AboutPage = () => {
    return (
        <>
            <h1 className='title'>О нас</h1>
            <p>Добро пожаловать на маркетплейс для вашего города!</p>

            <p>
                Наш проект создан с целью упростить жизнь местных жителей и
                способствовать развитию местного бизнеса. Мы стремимся стать
                главной онлайн-платформой, где каждый житель может найти
                необходимые товары и услуги, поддержать местных предпринимателей
                и наслаждаться выгодными предложениями.
            </p>

            <h2 className={cl.title2}>Что делает нас особенными?</h2>

            <ol className={cl.price_list}>
                <li>
                    <strong>Широкий выбор товаров и услуг</strong>: На нашем
                    маркетплейсе представлены различные категории товаров от
                    местных производителей и продавцов. Вы можете легко найти
                    все, от свежих продуктов и модной одежды до техники и
                    товаров для дома.
                </li>
                <li>
                    <strong>Поддержка местного бизнеса</strong>: Мы гордимся
                    тем, что способствуем развитию местных предпринимателей и
                    мастеров своего дела. Покупая на нашем маркетплейсе, вы не
                    только получаете качественные товары и услуги, но и
                    поддерживаете экономику вашего города.
                </li>
                <li>
                    <strong>Удобство и безопасность</strong>: Наш сайт
                    разработан с учетом всех современных технологий, чтобы
                    обеспечить вам максимальное удобство при покупках. Мы
                    гарантируем безопасные платежи и быструю доставку, чтобы вы
                    могли наслаждаться своими покупками без лишних хлопот.
                </li>
                <li>
                    <strong>Личное обслуживание и поддержка</strong>: Наша
                    команда всегда готова помочь вам с любыми вопросами или
                    проблемами. Мы ценим каждого клиента и стремимся предложить
                    решение, которое полностью удовлетворит ваши потребности.
                </li>
            </ol>

            <p>
                Присоединяйтесь к нашему сообществу и наслаждайтесь лучшими
                предложениями вашего города! Наш маркетплейс открыт для всех,
                кто ценит качество, удобство и поддержку местного бизнеса.
            </p>
            <LandingsContact />
        </>
    );
};

export default AboutPage;
