import MainList from "@/components/products/MainList";
import axios from "axios";
import cl from "./page.module.css";

const SellerPage = async ({ params }) => {
    const { sellerId } = params;
    const res = await axios.get(
        `${process.env.API_URL}/api/sellers/${sellerId}`
    );
    const seller = res.data.seller;

    try {
        const response = await axios.get(
            `${process.env.API_URL}/api/catalog/seller/${sellerId}`
        );
        const products = response.data;

        return (
            <div>
                <h1 className={cl.title}>
                    Продукты от продавца "{seller.name}"
                </h1>
                <MainList data={products} />
            </div>
        );
    } catch (error) {
        console.error(error);
        return <div>Ошибка при загрузке продуктов продавца</div>;
    }
};

export default SellerPage;
