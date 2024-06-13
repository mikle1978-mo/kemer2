import cl from "../toadvertisers.module.css";

export default function Tizer() {
    return (
        <>
            <h1 className='title'>
                Продвижение вашего бизнеса с тизерной рекламой
            </h1>
            <p>
                Хотите, чтобы ваш бизнес увидела широкая аудитория? Используйте
                наши услуги по размещению тизерной рекламы на нашем сайте!
            </p>

            <h2 className={cl.title2}>Преимущества тизерной рекламы</h2>
            <p>
                Тизерная реклама – это короткие и привлекательные объявления,
                которые вызывают интерес и желание узнать больше. Мы предлагаем
                различные форматы и места размещения для максимального охвата
                вашей целевой аудитории.
            </p>

            <h2 className={cl.title2}>Наши тарифы</h2>
            <ul className={cl.price_list}>
                <li>
                    <h3 className={cl.title3}>Тизеры на главной странице</h3>
                    <p>
                        <strong>Описание:</strong> Привлекайте внимание
                        посетителей сразу при заходе на сайт. Размещение на
                        главной странице обеспечивает высокий уровень видимости.
                    </p>
                    <p>
                        <strong>Размер:</strong> 300x150 пикселей
                    </p>
                    <p>
                        <strong>Стоимость:</strong> 25 000 рублей в месяц
                    </p>
                </li>
                <li>
                    <h3 className={cl.title3}>Тизеры в статьях</h3>
                    <p>
                        <strong>Описание:</strong> Ваши объявления будут
                        показаны на страницах с контентом, что обеспечивает
                        высокую релевантность и внимание читателей.
                    </p>
                    <p>
                        <strong>Размер:</strong> 300x150 пикселей
                    </p>
                    <p>
                        <strong>Стоимость:</strong> 18 000 рублей в месяц
                    </p>
                </li>
                <li>
                    <h3 className={cl.title3}>Ротационные тизеры</h3>
                    <p>
                        <strong>Описание:</strong> Ваши объявления будут
                        чередоваться на всех страницах сайта, охватывая
                        максимальное количество посетителей.
                    </p>
                    <p>
                        <strong>Размер:</strong> 300x150 пикселей
                    </p>
                    <p>
                        <strong>Стоимость:</strong> 22 000 рублей в месяц
                    </p>
                </li>
                <li>
                    <h3 className={cl.title3}>Таргетированные тизеры</h3>
                    <p>
                        <strong>Описание:</strong> Показывайте свои объявления
                        только тем пользователям, которые соответствуют вашему
                        целевому профилю, благодаря точной настройке таргетинга.
                    </p>
                    <p>
                        <strong>Размер:</strong> 300x150 пикселей
                    </p>
                    <p>
                        <strong>Стоимость:</strong> 35 000 рублей в месяц
                    </p>
                </li>
            </ul>

            <h2 className={cl.title2}>Дополнительные услуги</h2>
            <ul className={cl.price_list}>
                <li>
                    <h3 className={cl.title3}>Создание тизеров</h3>
                    <p>
                        <strong>Описание:</strong> Наши профессиональные
                        дизайнеры помогут вам создать привлекательные и
                        эффективные тизеры.
                    </p>
                    <p>
                        <strong>Стоимость:</strong> от 4 000 рублей в
                        зависимости от сложности
                    </p>
                </li>
            </ul>

            <h2 className={cl.title2}>Почему выбирают нас?</h2>
            <div className={cl.price_list}>
                <p>
                    <strong>Максимальный охват:</strong> Наш сайт посещают
                    тысячи пользователей каждый день.
                </p>
                <p>
                    <strong>Таргетинг:</strong> Мы показываем рекламу только
                    вашей целевой аудитории.
                </p>
                <p>
                    <strong>Эффективность:</strong> Тизеры вызывают интерес и
                    повышают кликабельность.
                </p>

                <p>
                    <strong>
                        Не упустите возможность продвинуть свой бизнес!
                        Свяжитесь с нами и закажите размещение тизерной рекламы
                        уже сегодня.
                    </strong>
                </p>
            </div>
        </>
    );
}
