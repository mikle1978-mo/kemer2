import React from "react";
import cl from "../tosellers.module.css";

export const metadata = {
    title: {
        default: "Продуктовые карточки ",
    },
    description:
        "Требования к формату, размеру и содержанию продуктовых карточек на сайте Кемер-онлайн",
    alternates: {
        canonical: `${process.env.API_URL}/landings/tosellers/productcard`,
    },
};

export default function PropductCard() {
    return (
        <>
            <h1 className='title'>Требования к фотографиям</h1>
            <section className={cl.block}>
                <h2 className={cl.title2}>Формат и размеры</h2>
                <ul>
                    <li>
                        Фотографии должны иметь вертикальный формат с
                        соотношением сторон 3:4 и разрешение не менее 900x1200
                        px.
                    </li>
                    <li>
                        Максимальный размер одной из сторон не должен превышать
                        8000 пикселей.
                    </li>
                    <li>
                        Разрешение изображения от 72 px/inch; Фотографии должны
                        быть в стандартном профиле sRGB IEC 61966-2.1.
                    </li>
                    <li>Формат изображения должен быть JPG, PNG или webp.</li>
                </ul>

                <h2 className={cl.title2}>
                    Требования к визуальному содержанию
                </h2>
                <ul>
                    <li>
                        Использовать нейтральный фон для того, чтобы товар был
                        хорошо виден и не отвлекал внимания.
                    </li>
                    <li>
                        В случае модельной съемки пол и стены должны иметь
                        презентабельный вид.
                    </li>
                    <li>
                        Не допускаются съемки в офисах, квартирах, дачах и
                        других «подручных» объектах.
                    </li>
                    <li>
                        Фотографии должны быть качественными, предмет продажи
                        должен быть в фокусе и без искажений.
                    </li>
                    <li>
                        Не должно быть логотипов, бирок, акций, кусков лишнего
                        фона или сторонних изображений на фотографиях.
                    </li>
                    <li>
                        Предмет продажи должен иметь презентабельный вид и
                        занимать максимальную площадь на фотографии.
                    </li>
                    <li>
                        Набор фотографий должен подробно описывать объект
                        продажи.
                    </li>
                    <li>
                        В случае съемки комплектов весь состав комплекта должен
                        быть представлен на первой фотографии.
                    </li>
                    <li>
                        Фотографии в рамках одного артикула должны быть сделаны
                        в одном стиле, вещи должны быть однотонными по
                        цвету/оттенку.
                    </li>
                    <li>
                        Если есть аксессуары, они также должны быть отсняты
                        (например, подарочная коробка, зажим, чехол и т.д.).
                    </li>
                    <li>
                        Не загружать фотографии товара, отснятого на манекене,
                        без предварительного согласования с Фотостудией.
                    </li>
                    <li>
                        Не допускаются фотографии моделей без головы, за
                        исключением товаров из категории «Нижнее белье».
                        Обрезанные лица недопустимы во всех случаях.
                    </li>
                    <li>На моделях не должно быть пирсинга и татуировок.</li>
                </ul>

                <h2 className={cl.title2}>Модельная съемка</h2>
                <ul>
                    <li>
                        Использовать нейтральный фон для того, чтобы товар был
                        хорошо виден и не отвлекал внимания.
                    </li>
                    <li>
                        Допускаются имиджевые фотографии, при условии, что фон
                        не отвлекает всё внимание на себя.
                    </li>
                    <li>
                        Рекомендуется использовать равномерный мягкий свет, без
                        глубоких теней и резких бликов.
                    </li>
                    <li>Вся фигура модели должна быть равномерно освещена.</li>
                </ul>

                <h2 className={cl.title2}>Предметная съемка</h2>
                <ul>
                    <li>
                        Использовать нейтральный фон для того, чтобы товар был
                        хорошо виден и не отвлекал внимания.
                    </li>
                    <li>
                        Рекомендуется использовать равномерный мягкий свет, без
                        глубоких теней и резких бликов.
                    </li>
                    <li>Предмет продажи должен быть равномерно освещен.</li>
                </ul>

                <h2 className={cl.title2}>Манекены</h2>
                <ul>
                    <li>
                        Манекены допускаются только для головных уборов, белья,
                        носков.
                    </li>
                    <li>
                        Для головных уборов допускаются только безликие
                        манекены.
                    </li>
                    <li>
                        Для белья и носков манекен должен быть удален с
                        фотографии.
                    </li>
                </ul>

                <h2 className={cl.title2}>Постельное белье</h2>
                <ul>
                    <li>Комплекты должны быть показаны полностью.</li>
                    <li>
                        Если есть конструктивные особенности (например,
                        резинка), они обязательно должны быть показаны.
                    </li>
                    <li>Наличие кадра с текстурой также обязательно.</li>
                </ul>
                <h2 className={cl.title2}>Контакты</h2>
            </section>
        </>
    );
}
