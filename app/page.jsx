import MainList from "@/components/products/MainList";
import CaruselAds from "../components/layouts/carouselAds/caruselAds";
import axios from "axios";

export function metadata() {
    return {
        title: "Интернет-магазин товаров Кемер-онлайн",
        description:
            "Онлайн магазин в Кемере, Анталия, Турция, доставка по городу Кемер",
        alternates: {
            canonical: `${process.env.API_URL}`,
        },
    };
}

const HomePage = async () => {
    let productData;
    let adsData;

    try {
        const productResponse = await axios.get(
            `${process.env.API_URL}/api/products`
        );
        productData = productResponse.data;
    } catch (error) {
        console.error("Ошибка запроса продуктов на главной странице:", error);
        productData = {
            products: [],
            filteredProductsCount: 0,
            productsCount: 0,
        };
    }

    try {
        const adsResponse = await axios.get(`${process.env.API_URL}/api/ads`);
        adsData = adsResponse.data.advertisers;
    } catch (error) {
        console.error("Ошибка запроса рекламы на главной странице:", error);
        adsData = [];
    }

    return (
        <>
            <div style={{ visibility: "hidden" }}>
                <h1 className='hiddenTitle'>
                    Продукты, товары и услуги в Кемере
                </h1>
            </div>
            <CaruselAds ads={adsData} />
            <MainList data={productData} />
        </>
    );
};

export default HomePage;
