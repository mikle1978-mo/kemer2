import BreadCrumbs from "@/components/layouts/BreadCrumbs/BreadCrumbs";
import MainList from "@/components/products/MainList";
import { getSlugName } from "@/helpers/helpers";
import axios from "axios";

export async function generateMetadata({ params }) {
    const { slug } = params; // массив slug

    try {
        // Получаем категорию через API
        const response = await axios.get(
            `${process.env.API_URL}/api/categories/1/${slug.join("/")}`
        );
        const category = response.data;

        if (!category) {
            return {
                title: "Интернет магазин Кемера! Продукты и товары с доставкой",
                description:
                    "Купите и продайте товары онлайн в Кемере. Бесплатная доставка по городу, большой выбор товаров по низким ценам. Быстрая доставка и удобный шопинг для всех!",
            };
        }

        // Генерируем метаданные на основе данных категории
        return {
            metadataBase: new URL(process.env.API_URL),
            title: category.seo?.title || category.name,
            description:
                category.seo?.description || `Категория ${category.name}`,
            openGraph: {
                images: ["/images/default_category.png"], // Добавьте изображение категории, если оно есть
            },
            alternates: {
                canonical: `${process.env.API_URL}/catalog/${slug.join("/")}`,
            },
            keywords: category.seo?.keywords || [],
        };
    } catch (error) {
        console.error("Ошибка при получении категории:", error.message);
        return {
            title: "Интернет магазин Кемера! Продукты и товары с доставкой",
            description:
                "Купите и продайте товары онлайн в Кемере. Бесплатная доставка по городу, большой выбор товаров по низким ценам. Быстрая доставка и удобный шопинг для всех!",
        };
    }
}

const CategoryPage = async ({ params }) => {
    const { slug } = params; // массив slug (пример: ['men', 'shoes', 'boots'])

    // Собираем полный путь из массива slug
    const categoryPath = slug.join("/");
    const slugForBreadcrumbs = slug;
    slugForBreadcrumbs.pop();

    const breadCrumbs = [
        { name: "Главная", url: "/" }, // Первая крошка — Главная страница
    ];

    let accumulatedPath = "/catalog/category"; // Переменная для накопления пути

    slugForBreadcrumbs.forEach((item) => {
        accumulatedPath += `/${item}`; // Накапливаем путь
        breadCrumbs.push({
            name: getSlugName(item), // Получаем имя для текущего сегмента
            url: accumulatedPath, // Формируем URL для текущего сегмента
        });
    });

    try {
        // Используем categoryPath для запроса на API
        const response = await axios.get(
            `${process.env.API_URL}/api/catalog/category/${categoryPath}`
        );
        const products = response.data;

        return (
            <>
                <BreadCrumbs breadCrumbs={breadCrumbs} />
                <MainList data={products} />
            </>
        );
    } catch (error) {
        console.error(error);
        return <div>Ошибка при загрузке продуктов категории</div>;
    }
};

export default CategoryPage;
