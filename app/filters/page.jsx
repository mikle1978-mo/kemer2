import Filters from "@/components/filters/Filters";
import React from "react";

export const metadata = {
    title: {
        default: "Фильтр продуктов на сайте Кемер-онлайн",
    },
    description:
        "Фильтр продуктов на сайте Кемер-онлайн по категориям, цене, и рейтингу",
    alternates: {
        canonical: `${process.env.API_URL}/filters`,
    },
};

const FiltersPage = () => {
    return <Filters />;
};

export default FiltersPage;
