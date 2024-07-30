import Products from "@/components/admin/(Products)/Products";

const AdminProductsPage = async () => {
    try {
        const response = await fetch(`${process.env.API_URL}/api/products`, {
            next: { revalidate: 60 },
        });

        // Проверяем, что запрос успешен
        if (!response.ok) {
            throw new Error("Ошибка при загрузке продуктов");
        }

        // Получаем данные в формате JSON
        const products = await response.json();

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
