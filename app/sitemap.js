import axios from "axios";

export default async function sitemap() {
    try {
        const response = await axios.get(`${process.env.API_URL}/api/sitemap`);
        const data = response.data;

        const entries = data.products.map(({ _id, createdAt }) => ({
            url: `${process.env.API_URL}/product/${_id}`,
            lastModified: new Date(createdAt).toISOString(),
        }));

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
            ...entries,
        ];
    } catch (error) {
        console.error("Ошибка при получении данных для sitemap:", error);
        return [];
    }
}
