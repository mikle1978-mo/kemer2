import ProductDetails from "@/components/products/ProductDetails";
import axios from "axios";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { mark } from "@/lib/const/const";
import { cache } from "react";

export async function generateMetadata({ params }) {
    const product = await getProductDetails(params?.id);
    return {
        title: `${product.name} ${""}${product?.brand}`,
        description: `${product?.name} купить за ${product?.price} ${mark} на кемер-онлайн. Фирма ${product?.brand}. Постоянные скидки, оптовые цены!`,
        openGraph: {
            images: [product.images[0]],
        },
        alternates: {
            canonical: `${process.env.API_URL}/product/${product._id}`,
        },
        keywords: [`${product.name} `],
    };
}

export async function generateStaticParams() {
    const { data } = await axios.get(`${process.env.API_URL}/api/products`);
    console.log(
        "GSP",
        data.products.map(({ _id }) => _id)
    );
    return data.products.map(({ _id }) => _id);
}

const getProductDetails = cache(async (id) => {
    const { data } = await axios.get(
        `${process.env.API_URL}/api/products/${id}`
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
