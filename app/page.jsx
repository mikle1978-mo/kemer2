import axios from "axios";
import ListProducts from "@/components/products/ListProducts";
import { dbConnect } from "@/backend/config/dbConnect";
import Carusel from "../components/layouts/carusel/myCarusel";
import queryString from "query-string";

export async function generateMetadata({ searchParams }) {
    console.log("searchParams", searchParams);
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
            {/* <Carusel /> */}
            <ListProducts searchParams={searchParams} />
        </>
    );
};

export default HomePage;
