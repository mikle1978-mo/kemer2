import axios from "axios";
import Products from "@/components/admin/(Products)/Products";

const AdminProductsPage = async () => {
    try {
        const response = await axios.get(`${process.env.API_URL}/api/products`);
        const products = response.data;

        return (
            <div>
                <h1 className='title'>Продукты </h1>
                <Products data={products} />
            </div>
        );
    } catch (error) {
        console.error(error);
        return <div>Ошибка при загрузке продуктов админа</div>;
    }
};

export default AdminProductsPage;
