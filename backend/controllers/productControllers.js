import Product from "../models/product";
import APIFilters from "../utils/APIFilters";
import { cloudinary, uploadToCloudinary } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";
import { NextResponse } from "next/server";

export const newProduct = async (req, res, next) => {
    const body = await req.json();
    const product = await Product.create(body);
    return {
        product,
    };
};

export const getProducts = async (req, res, next) => {
    // const resPerPage = 4;
    const productsCount = await Product.countDocuments();
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const queryParams = {
        keyword: searchParams.get("keyword"),
        page: searchParams.get("page"),
        category: searchParams.get("category"),
        "price[gte]": searchParams.get("price[gte]"),
        "price[lte]": searchParams.get("price[lte]"),
        "ratings[gte]": searchParams.get("ratings[gte]"),
    };

    let queryStr = Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v != null)
    );

    const apiFilters = new APIFilters(Product.find(), queryStr)
        .search()
        .filter();

    let products = await apiFilters.query;
    const filteredProductsCount = products.length;

    // apiFilters.pagination(resPerPage);

    products = await apiFilters.query.clone();

    return {
        productsCount,
        // resPerPage,
        filteredProductsCount,
        products,
    };
};

export const getAdminProducts = async (req, res, next) => {
    // const resPerPage = 6;
    const productsCount = await Product.countDocuments();
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const queryParams = {
        keyword: searchParams.get("keyword"),
        page: searchParams.get("page"),
        category: searchParams.get("category"),
        "price[gte]": searchParams.get("price[gte]"),
        "price[lte]": searchParams.get("price[lte]"),
        "ratings[gte]": searchParams.get("ratings[gte]"),
    };

    let queryStr = Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v != null)
    );
    const apiFilters = new APIFilters(Product.find(), queryStr)
        .search()
        .filter();

    let products = await apiFilters.query;
    const filteredProductsCount = products.length;

    // apiFilters.pagination(resPerPage);

    products = await apiFilters.query.clone();

    return {
        productsCount,
        // resPerPage,
        filteredProductsCount,
        products,
    };
};

export const getProduct = async (req, id) => {
    const product = await Product.findById(id);

    if (!product) {
        return new ErrorHandler("Product not found.", 404);
    }

    return {
        product,
    };
};

export const uploadProductImages = async (req, id) => {
    let product = await Product.findById(id);

    try {
        const data = await req.formData();
        const files = await data.getAll("image");
        console.log("Количество изображений:", files.length);
        if (files.length === 0) {
            console.error("Нет прикрепленных изображений");
            return new ErrorHandler("Нет прикрепленных изображений", 400);
        }

        if (!product) {
            return new ErrorHandler("Продукт не найден.", 404);
        }

        const uploader = async (fileUri) =>
            await uploadToCloudinary(fileUri, "ecomm/products");

        let urls = [];

        const uploadPromises = files.map(async (image) => {
            const fileBuffer = await image.arrayBuffer();
            let mime = image.type;
            let encoding = "base64";
            let base64Data = Buffer.from(fileBuffer).toString("base64");
            let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

            try {
                const imgUrl = await uploader(fileUri);
                return imgUrl;
            } catch (error) {
                console.error(error);
            }
        });

        urls = await Promise.all(uploadPromises);

        product = await Product.findByIdAndUpdate(id, {
            images: urls,
        });

        return {
            data: urls,
            product,
        };
    } catch (error) {
        console.error("Error handling form data:", error);
        return new ErrorHandler("Error handling form data", 500);
    }
};

export const updateProduct = async (req, id) => {
    let product = await Product.findById(id);

    if (!product) {
        return new ErrorHandler("Продукт не найден.", 404);
    }

    const body = await req.json();

    product = await Product.findByIdAndUpdate(id, body);

    return {
        product,
    };
};

export const deleteProduct = async (req, id, next) => {
    let product = await Product.findById(id);

    if (!product) {
        return NextResponse.next(new ErrorHandler("Product not found.", 404));
    }

    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
        const res = await cloudinary.uploader.destroy(
            product.images[i].public_id
        );
    }

    await product.deleteOne();

    return {
        success: true,
    };
};

export const createProductReview = async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment,
    };

    let product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    const isReviewed = product?.reviews?.find(
        (r) => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product?.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        });
    } else {
        product?.reviews.push(review);
    }

    product.ratings =
        product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

    await product?.save();

    res.status(200).json({
        success: true,
    });
};
