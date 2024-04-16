import axios from "axios";

export default async function sitemap() {
    const { data } = await axios.get(`${process.env.API_URL}/api/products`);
    const entries = data.products.map(({ _id, createdAt }) => ({
        url: `${process.env.API_URL}/product/${_id}`,
        lastModified: new Date(createdAt),
    }));
    return [
        {
            url: `${process.env.API_URL}`,
        },
        ...entries,
    ];
}
