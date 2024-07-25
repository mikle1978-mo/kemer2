import axios from "axios";
import Products from "@/components/admin/(Products)/Products";

const SellerPage = async ({ params }) => {
    const { sellerId } = params;

    try {
        const response = await axios.get(
            `${process.env.API_URL}/api/products/seller/${sellerId}`
        );
        const products = response.data;

        const { data } = await axios.get(
            `${process.env.API_URL}/api/sellers/${sellerId}`
        );
        const seller = data.seller;

        return (
            <div>
                <h1 className='title'>Продукты продавца "{seller.name}"</h1>
                <Products data={products} />
            </div>
        );
    } catch (error) {
        console.error(error);
        return <div>Ошибка при загрузке продуктов продавца</div>;
    }
};

export default SellerPage;
