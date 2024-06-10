import axios from "axios";
import ListProducts from "@/components/products/ListProducts";
import { dbConnect } from "@/backend/config/dbConnect";
import queryString from "query-string";
import Carusel from "../components/layouts/carusel/myCarusel";
import { insert } from "@/helpers/helpers";

const HomePage = async ({ searchParams }) => {
    dbConnect();
    const urlParams = {
        keyword: searchParams.keyword,
        page: searchParams.page,
        category: searchParams.category,
        "price[gte]": searchParams.min,
        "price[lte]": searchParams.max,
        "ratings[gte]": searchParams.ratings,
    };

    const searchQuery = queryString.stringify(urlParams);

    const { data } = await axios.get(
        `${process.env.API_URL}/api/products?${searchQuery}`
    );
    const dataAds = await axios.get(`${process.env.API_URL}/api/ads`);
    let carouselAds = dataAds.data.allAds.filter(
        (item) => item.type === "Карусель"
    );
    let listAds = dataAds.data.allAds.filter(
        (item) => item.type !== "Карусель"
    );

    data.products = data.products.filter((item) => item.stock > 0);
    data.products = data.products.sort(() => Math.random() - 0.5);
    insert(data.products, listAds);

    return (
        <>
            <Carusel data={carouselAds} />
            <ListProducts data={data} />
        </>
    );
};

export default HomePage;
