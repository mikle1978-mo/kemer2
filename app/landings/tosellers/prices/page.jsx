import React from "react";
import cl from "../tosellers.module.css";

export const metadata = {
    title: {
        default: "Размеры комиссий ",
    },
    description:
        "Узнайте размеры комиссий, тарифы, цены на торговой площадке Кемер-онлайн.",
    alternates: {
        canonical: `${process.env.API_URL}/landings/tosellers/prices`,
    },
};

const PricesPage = () => {
    return (
        <>
            <h1 className='title'>Комиссии с продаж на нашем маркетплейсе</h1>
            <section className={cl.block}>
                <h2 className={cl.title2}>Основная комиссия</h2>
                <p>
                    Для каждого проданного товара на нашем маркетплейсе
                    взимается стандартная комиссия в размере не более{" "}
                    <span className={cl.highlight}>10%</span> от общей стоимости
                    заказа. Эта комиссия покрывает расходы на обработку
                    платежей, обслуживание платформы и поддержку клиентов.
                </p>
            </section>
            <section className={cl.block}>
                <h2 className={cl.title2}>Дополнительные комиссии</h2>
                <ul>
                    <li className={cl.add}>
                        <p>
                            <span className={cl.highlight}>
                                Премиум-размещение:
                            </span>{" "}
                            Если вы хотите выделить ваш товар среди других и
                            повысить его видимость, вы можете выбрать опцию
                            премиум-размещения. Комиссия за премиум-размещение
                            составляет дополнительные{" "}
                            <span className={cl.highlight}>5%</span> от
                            стоимости товара.
                        </p>
                    </li>
                    <li className={cl.add}>
                        <p>
                            <span className={cl.highlight}>
                                Комиссия за доставку:
                            </span>{" "}
                            Для товаров, требующих особых условий доставки,
                            может взиматься дополнительная комиссия в размере{" "}
                            <span className={cl.highlight}>2-5%</span> от
                            стоимости товара, в зависимости от типа доставки и
                            места назначения.
                        </p>
                    </li>
                    <li className={cl.add}>
                        <p>
                            <span className={cl.highlight}>
                                Платежные системы:
                            </span>{" "}
                            При использовании определенных платежных систем
                            может взиматься дополнительная комиссия за обработку
                            платежей. Эти комиссии варьируются от{" "}
                            <span className={cl.highlight}>1%</span> до{" "}
                            <span className={cl.highlight}>3%</span> от общей
                            суммы транзакции и зависят от выбранной платежной
                            системы.
                        </p>
                    </li>
                </ul>
            </section>
            <section className={cl.block}>
                <h2 className={cl.title2}>Пример расчета комиссии</h2>
                <p>
                    Предположим, вы продаете товар за 1000 лир. В этом случае
                    ваш расчет будет следующим:
                </p>
                <ul>
                    <li>Стоимость товара: 1000 лир</li>
                    <li>Основная комиссия (10%): 100 лир</li>
                    <li>Премиум-размещение (если выбрано, 5%): 50 лир</li>
                    <li>Комиссия за доставку (если применимо, 3%): 30 лир</li>
                </ul>
                <p>
                    Общая комиссия составит 180 лир, и ваша прибыль от продажи
                    будет 820 лир.
                </p>
            </section>
            <section className={cl.block}>
                <h2 className={cl.title2}>Преимущества работы с нами</h2>
                <ul>
                    <li>
                        Прозрачные условия: Все комиссии четко определены и
                        отображаются на этапе размещения товара.
                    </li>
                    <li>
                        Поддержка продавцов: Мы предоставляем круглосуточную
                        поддержку для всех наших продавцов.
                    </li>
                    <li>
                        Широкая аудитория: Наш маркетплейс посещают тысячи
                        покупателей ежедневно, что увеличивает ваши шансы на
                        успешные продажи.
                    </li>
                </ul>
            </section>
            <section className={cl.block}>
                <h2 className={cl.title2}>Как снизить комиссии</h2>
                <p>
                    Мы ценим наших продавцов и предлагаем различные программы
                    лояльности и скидки на комиссии для постоянных и
                    высокоактивных пользователей. Чтобы узнать больше о том, как
                    вы можете снизить свои комиссии, свяжитесь с нашей службой
                    поддержки.
                </p>
            </section>
            <section className={cl.block}>
                <h2 className={cl.title2}>Часто задаваемые вопросы</h2>
                <details>
                    <summary>
                        {" "}
                        Как я могу узнать, сколько составит комиссия за мою
                        продажу?
                    </summary>{" "}
                    <p>
                        Комиссия будет рассчитана при заключении договора на
                        размещение товара.
                    </p>
                </details>
                <details>
                    <summary>Могу ли я получить скидку на комиссии?</summary>
                    <p>
                        Да, мы предлагаем скидки и программы лояльности для
                        постоянных и активных продавцов. Пожалуйста, свяжитесь с
                        нашей службой поддержки для получения дополнительной
                        информации.
                    </p>
                </details>
                <details>
                    <summary>
                        Какие платежные системы поддерживаются на вашем
                        маркетплейсе?
                    </summary>
                    <p>
                        Мы поддерживаем множество платежных систем, включая
                        кредитные и дебетовые карты, электронные кошельки и
                        банковские переводы. Подробную информацию вы можете
                        уточнить по телефону.
                    </p>
                </details>
                <h2 className={cl.title2}>Контакты</h2>
            </section>
        </>
    );
};

export default PricesPage;
