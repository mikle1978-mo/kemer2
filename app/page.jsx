import axios from "axios";
import ListProducts from "@/components/products/ListProducts";
import { dbConnect } from "@/backend/config/dbConnect";
import Carusel from "../components/layouts/carusel/myCarusel";
import queryString from "query-string";

export async function generateMetadata({ searchParams }) {
    const category = searchParams.category;
    const inputTitle = category ? ` ${category}` : "";
    const inputUrlQuery = category ? `/?category=${category}` : "";

    return {
        title: `Интернет-магазин товаров Кемер-онлайн  ${inputTitle}`,
        description: `Онлайн магазин в Кемере, Анталия, Турция, бесплатная доставка по городу Кемер ${inputTitle}`,
        alternates: {
            canonical: `${process.env.API_URL}${inputUrlQuery}`,
        },
    };
}

const HomePage = async ({ searchParams }) => {
    dbConnect();
    const urlParams = {
        keyword: searchParams.keyword,
        page: searchParams.page,
        limit: process.env.NUMDER_OF_PRODUCTS,
        forceRefresh: true,
        category: searchParams.category,
        "price[gte]": searchParams.min,
        "price[lte]": searchParams.max,
        "ratings[gte]": searchParams.ratings,
    };

    const searchQuery = queryString.stringify(urlParams);

    const response = await axios.get(
        `${process.env.API_URL}/api/products?${searchQuery}`
    );
    const data = response.data;

    return (
        <>
            <div style={{ visibility: "hidden" }}>
                <h1 className='hiddenTitle'>
                    Продукты, товары и услуги в Кемере{" "}
                    {searchParams.category
                        ? `категория ${searchParams.category}`
                        : ""}
                </h1>
            </div>
            <Carusel data={data.carouselAds} />
            <ListProducts data={data} searchParams={searchParams} />
        </>
    );
};

export default HomePage;
