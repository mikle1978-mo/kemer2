import MainList from "@/components/products/MainList";
import axios from "axios";

const SellerPage = async ({ params }) => {
    const { sellerId } = params;

    try {
        const response = await axios.get(
            `${process.env.API_URL}/api/products/seller/${sellerId}`
        );
        const products = response.data;

        return (
            <div>
                <h1>Продукты от продавца {sellerId}</h1>
                <MainList data={products} />
            </div>
        );
    } catch (error) {
        console.error(error);
        return <div>Ошибка при загрузке продуктов продавца</div>;
    }
};

export default SellerPage;
