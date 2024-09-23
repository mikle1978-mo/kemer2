import MainList from "@/components/products/MainList";
import CaruselAds from "../components/layouts/carouselAds/caruselAds";
import axios from "axios";

const HomePage = async () => {
    let productData;
    let adsData;

    try {
        const [productResponse, adsResponse] = await Promise.all([
            axios.get(`${process.env.API_URL}/api/catalog`),
            axios.get(`${process.env.API_URL}/api/ads`),
        ]);

        productData = productResponse.data;
        adsData = adsResponse.data;
    } catch (error) {
        console.error("Ошибка запроса на главной странице:", error);
        productData = {
            products: [],
            filteredProductsCount: 0,
            productsCount: 0,
        };
        adsData = { advertisersCount: 0, advertisers: [] };
    }

    return (
        <>
            <div style={{ visibility: "hidden" }}>
                <h1 className='hiddenTitle'>
                    Продукты, товары и услуги в Кемере
                </h1>
            </div>
            <CaruselAds data={adsData} />
            <MainList data={productData} />
        </>
    );
};

export default HomePage;
