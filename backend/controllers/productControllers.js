import Product from "../models/product";
import APIFilters from "../utils/APIFilters";
import { cloudinary, uploads } from "../utils/cloudinary";
import fs from "fs/promises";
import path from "path";
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
    const resPerPage = 4;
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

    apiFilters.pagination(resPerPage);

    products = await apiFilters.query.clone();

    return {
        productsCount,
        resPerPage,
        filteredProductsCount,
        products,
    };
};

export const getAdminProducts = async (req, res, next) => {
    const resPerPage = 6;
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

    apiFilters.pagination(resPerPage);

    products = await apiFilters.query.clone();

    return {
        productsCount,
        resPerPage,
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
    console.log("productController uploadProductsImage req:::", req);
    console.log("productController uploadProductsImage id:::", id);
    let product = await Product.findById(id);

    try {
        const formData = await req.formData();
        const files = formData.getAll("image");

        if (!product) {
            return new ErrorHandler("Product not found.", 404);
        }

        const uploader = async (destinationDirPath) => {
            // Ваш код для загрузки в Cloudinary
            await uploads(destinationDirPath, "buyitnow/products");
        };

        let urls = [];

        const uploadPromises = files.map(async (file) => {
            const destinationDirPath = path.join(
                "/tmp",
                "public/images/uploads",
                file.name
            );

            const destinationDir = path.dirname(destinationDirPath);

            // Проверка и создание директории, если её нет
            try {
                await fs.access(destinationDir);
            } catch (error) {
                if (error.code === "ENOENT") {
                    // Директория не существует, создаем её
                    await fs.mkdir(destinationDir, { recursive: true });
                } else {
                    // Другая ошибка, обрабатываем по вашему усмотрению
                    throw error;
                }
            }

            const fileBuffer = await file.arrayBuffer();
            await fs.writeFile(destinationDirPath, Buffer.from(fileBuffer));

            const imgUrl = await uploader(destinationDirPath);

            // Удаляем локальный файл после успешной загрузки в Cloudinary
            await fs.unlink(destinationDirPath);

            return imgUrl;
        });

        urls = await Promise.all(uploadPromises);

        // Обновляем информацию о продукте в базе данных с использованием полученных URL-адресов
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
        return new ErrorHandler("Product not found.", 404);
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
        const res = await cloudinary.v2.uploader.destroy(
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
