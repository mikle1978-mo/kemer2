import Products from "@/components/admin/(Products)/Products";

export const revalidate = 60; // Обновление данных каждые 10 секунд

const SellerPage = async ({ params }) => {
    const { sellerId } = params;

    try {
        const response = await fetch(
            `${process.env.API_URL}/api/products/seller/${sellerId}`,
            { next: { revalidate: 0 } }
        );
        if (!response.ok) {
            throw new Error("Ошибка при загрузке продуктов");
        }

        // Получаем данные в формате JSON
        const products = await response.json();

        // Запрос информации о продавце
        const sellerResponse = await fetch(
            `${process.env.API_URL}/api/sellers/${sellerId}`,
            {
                next: { revalidate: 0 }, // Ревалидировать данные каждые 2 минуты
            }
        );

        if (!sellerResponse.ok) {
            throw new Error("Ошибка при загрузке информации о продавце");
        }

        // Получаем данные продавца в формате JSON
        const { seller } = await sellerResponse.json();

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
