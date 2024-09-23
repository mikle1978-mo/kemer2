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
                title: 'Интернет магазин "Кемер-онлайн"',
                description:
                    "Купите и продайте продукты и товары онлайн в Кемере! Удобный магазин с бесплатной доставкой по городу. Большой выбор товаров по низким ценам, быстрая доставка и легкость покупок. Идеально для тех, кто ищет выгодные предложения и удобство шопинга!",
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
            title: 'Интернет магазин "Кемер-онлайн"',
            description:
                "Купите и продайте продукты и товары онлайн в Кемере! Удобный магазин с бесплатной доставкой по городу. Большой выбор товаров по низким ценам, быстрая доставка и легкость покупок. Идеально для тех, кто ищет выгодные предложения и удобство шопинга!",
        };
    }
}

const CategoryPage = async ({ params }) => {
    const { slug } = params; // массив slug (пример: ['men', 'shoes', 'boots'])

    // Собираем полный путь из массива slug
    const categoryPath = slug.join("/");
    const slugForBreadcrumbs = slug;
    slugForBreadcrumbs.pop();
    console.log(slugForBreadcrumbs);

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
