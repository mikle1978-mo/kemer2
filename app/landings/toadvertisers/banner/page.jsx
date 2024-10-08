import cl from "../toadvertisers.module.css";
import Image from "next/image";

export const metadata = {
    title: {
        default: "Баннеры на сайте Кемер-онлайн",
    },
    description:
        "Узнайте условия, цены и порядок размещения баннеров на сайте Кемер-онлайн. Эффективная реклама для вашего бизнеса с удобными условиями размещения.",
    alternates: {
        canonical: `${process.env.API_URL}/landings/toadvertisers/banner`,
    },
};

export default function Banner() {
    return (
        <>
            <h1 className='title'>
                Услуга по размещению баннерной рекламы на нашем сайте
            </h1>
            <p>
                Привлекайте новых клиентов и увеличивайте продажи с помощью
                баннерной рекламы на нашем популярном сайте!
            </p>

            <h2 className={cl.title2}>Наши предложения:</h2>
            <ul className={cl.price_list}>
                <li>
                    <h3 className={cl.title3}>
                        Размещение на Главной странице
                    </h3>
                    <div className={cl.imgWrap}>
                        <Image
                            className='w-auto'
                            src='/images/landings/toadvertisers/2024-06-14_11-30-17.webp'
                            fill
                            sizes='(max-width: 768px) 30vw, (max-width: 1200px)  33vw'
                            alt='Баннер на главной странице'
                        />
                    </div>
                    <p>
                        <strong>Описание:</strong> Ваш баннер будет отображаться
                        на главной странице нашего сайта, гарантируя
                        максимальную видимость и внимание посетителей.
                    </p>

                    <p>
                        <strong>Цена:</strong> 200 лир/месяц
                    </p>
                </li>
                <li>
                    <h3 className={cl.title3}>Размещение в ленте товаров</h3>
                    <div className={cl.imgWrap}>
                        <Image
                            className='w-auto'
                            src='/images/landings/toadvertisers/2024-06-14_16-26-45.webp'
                            fill
                            sizes='(max-width: 768px) 30vw, (max-width: 1200px)  33vw'
                            alt='Баннер в ленте товаров'
                        />
                    </div>
                    <p>
                        <strong>Описание:</strong> Ваш баннер будет показан на
                        страницах статей, что обеспечит высокую релевантность и
                        заинтересованность нашей аудитории.
                    </p>

                    <p>
                        <strong>Цена:</strong> 100 лир/месяц
                    </p>
                </li>
            </ul>

            <h2 className={cl.title2}>Дополнительные услуги:</h2>
            <ul className={cl.price_list}>
                <li>
                    <h3 className={cl.title3}>Разработка баннера</h3>
                    <p>
                        <strong>Описание:</strong> Если у вас еще нет готового
                        баннера, наши дизайнеры создадут его для вас.
                    </p>
                    <p>
                        <strong>Цена:</strong> от 500 лир (в зависимости от
                        сложности)
                    </p>
                </li>
                <li>
                    <h3 className={cl.title3}>
                        Ротация баннера на всех страницах сайта
                    </h3>
                    <p>
                        Ваш баннер будет ротационно отображаться на всех
                        страницах нашего сайта, достигая широкой аудитории.
                    </p>
                    <br />
                    <h3 className={cl.title3}>Таргетированное размещение</h3>
                    <p>
                        Ваш баннер будет показываться только целевой аудитории,
                        отобранной по демографическим и поведенческим признакам.
                    </p>
                </li>
            </ul>

            <h2 className={cl.title2}>Почему выбирают нас:</h2>
            <div className={cl.price_list}>
                <p>
                    <strong>Высокая видимость:</strong> Размещение на популярном
                    и посещаемом сайте.
                </p>
                <p>
                    <strong>Целевая аудитория:</strong> Точные настройки
                    таргетинга.
                </p>
                <p>
                    <strong>Профессиональный дизайн:</strong> Качественные и
                    привлекательные баннеры.
                </p>

                <p>
                    <strong>
                        Не упустите возможность увеличить продажи и повысить
                        узнаваемость вашего бренда! Свяжитесь с нами прямо
                        сейчас и закажите размещение баннерной рекламы.
                    </strong>
                </p>
                <h2 className={cl.title2}>Контакты</h2>
            </div>
        </>
    );
}
