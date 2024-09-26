import axios from "axios";
import { slugs_top, slugs_middle, slugs_buttom } from "lib/slugs/slugs";

export default async function sitemap() {
    try {
        const response = await axios.get(`${process.env.API_URL}/api/sitemap`);
        const data = response.data;

        // Создание записей для продуктов
        const entries = data.products.map(({ _id, createdAt }) => ({
            url: `${process.env.API_URL}/catalog/${_id}`,
            lastModified: new Date(createdAt).toISOString(),
        }));

        // Создание записей для слагов (top, middle, bottom)
        const slugsEntries = [
            ...slugs_top,
            ...slugs_middle,
            ...slugs_buttom,
        ].map(({ slug }) => ({
            url: `${process.env.API_URL}/catalog/category/${slug}`,
            lastModified: new Date().toISOString(),
        }));

        // Финальная карта сайта с общими страницами, продуктами, категориями и слагами
        return [
            {
                url: `${process.env.API_URL}`,
            },
            {
                url: `${process.env.API_URL}/landings/about`,
                lastModified: new Date().toISOString(),
            },
            {
                url: `${process.env.API_URL}/landings/toadvertisers/banner`,
                lastModified: new Date().toISOString(),
            },
            {
                url: `${process.env.API_URL}/landings/toadvertisers/landingpage`,
                lastModified: new Date().toISOString(),
            },
            {
                url: `${process.env.API_URL}/landings/toadvertisers/tizer`,
                lastModified: new Date().toISOString(),
            },
            {
                url: `${process.env.API_URL}/landings/tosellers/conditions`,
                lastModified: new Date().toISOString(),
            },
            {
                url: `${process.env.API_URL}/landings/tosellers/prices`,
                lastModified: new Date().toISOString(),
            },
            {
                url: `${process.env.API_URL}/landings/tosellers/productcard`,
                lastModified: new Date().toISOString(),
            },
            // Добавляем страницы продуктов
            ...entries,
            // Добавляем страницы категорий
            ...slugsEntries,
        ];
    } catch (error) {
        console.error("Ошибка при получении данных для sitemap:", error);
        return [];
    }
}
