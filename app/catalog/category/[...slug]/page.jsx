import MainList from "@/components/products/MainList";
import axios from "axios";

const CategoryPage = async ({ params }) => {
    const { slug } = params; // массив slug (пример: ['men', 'shoes', 'boots'])
    console.log(slug);

    // Собираем полный путь из массива slug
    const categoryPath = slug.join("/");
    console.log(categoryPath);
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
