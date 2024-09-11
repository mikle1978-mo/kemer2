import ProductDetails from "@/components/products/ProductDetails";
import axios from "axios";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { mark } from "@/lib/const/const";
import { cache } from "react";

export async function generateMetadata({ params }) {
    const product = await getProductDetails(params?.id);

    if (!product) {
        return {
            title: "Продукт не найден",
            description: "Извините, этот продукт не найден.",
        };
    }

    return {
        title: `${product.name} ${""}${product?.brand}`,
        description: `${product?.name} купить за ${product?.price} ${mark} на кемер-онлайн. Фирма ${product?.brand}. Постоянные скидки, оптовые цены!`,
        openGraph: {
            images: [product.images[0]],
        },
        alternates: {
            canonical: `${process.env.API_URL}/catalog/${product._id}`,
        },
        keywords: [`${product.name} `],
    };
}

export async function generateStaticParams() {
    try {
        const { data } = await axios.get(`${process.env.API_URL}/api/catalog`);
        return data.products.map(({ _id }) => _id);
    } catch (error) {
        console.error("Failed to fetch catalog:", error);
        return [];
    }
}

const getProductDetails = cache(async (id) => {
    const { data } = await axios.get(
        `${process.env.API_URL}/api/catalog/${id}`
    );

    return data?.product;
});

const ProductDetailsPage = async ({ params }) => {
    const isValidId = mongoose.isValidObjectId(params?.id);

    if (!isValidId) {
        return redirect("/");
    }

    const product = await getProductDetails(params?.id);

    return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
