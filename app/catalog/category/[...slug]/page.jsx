import MainList from "@/components/products/MainList";
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
                title: "Категория не найдена",
                description: "Извините, эта категория не найдена.",
            };
        }

        // Генерируем метаданные на основе данных категории
        return {
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
            title: "Ошибка",
            description: "Произошла ошибка при загрузке категории.",
        };
    }
}

const CategoryPage = async ({ params }) => {
    const { slug } = params; // массив slug (пример: ['men', 'shoes', 'boots'])

    // Собираем полный путь из массива slug
    const categoryPath = slug.join("/");

    try {
        // Используем categoryPath для запроса на API
        const response = await axios.get(
            `${process.env.API_URL}/api/catalog/category/${categoryPath}`
        );
        const products = response.data;

        return (
            <>
                <MainList data={products} />
            </>
        );
    } catch (error) {
        console.error(error);
        return <div>Ошибка при загрузке продуктов категории</div>;
    }
};

export default CategoryPage;
