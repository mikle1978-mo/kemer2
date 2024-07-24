import MainList from "@/components/products/MainList";
import axios from "axios";

const CategoryPage = async ({ params }) => {
    const { categoryId } = params;

    try {
        const response = await axios.get(
            `${process.env.API_URL}/api/products/category/${categoryId}`
        );
        const products = response.data;

        return (
            <>
                <h1>Продукты в категории {categoryId}</h1>
                <MainList data={products} />
            </>
        );
    } catch (error) {
        console.error(error);
        return <div>Ошибка при загрузке продуктов категории</div>;
    }
};

export default CategoryPage;
