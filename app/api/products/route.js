export const dynamic = "force-dynamic";

import { getProducts } from "@/backend/controllers/productControllers";
import { getAllAds } from "@/backend/controllers/adsControllers";
import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";
import { insertAds, shuffleArray } from "@/helpers/helpers";

// Глобальные переменные для хранения кэшированных данных и времени кэширования
let cachedData = null;
let cacheTime = 0;
const cacheDuration = 3000; // Время жизни кэша в секундах (например, 5 минут)

export async function GET(req) {
    try {
        dbConnect(); // Установка соединения с базой данных

        // Извлечение параметров запроса из URL
        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);

        const queryParams = {
            keyword: searchParams.get("keyword"),
            limit: parseInt(searchParams.get("limit"), 10) || 10, // Лимит по умолчанию 10, если не указан
            forceRefresh: searchParams.get("forceRefresh") === "true",
            offset: parseInt(searchParams.get("offset"), 10) || 0, // Офсет по умолчанию 0, если не указан
            page: searchParams.get("page"),
            category: searchParams.get("category"),
            "price[gte]": searchParams.get("price[gte]"),
            "price[lte]": searchParams.get("price[lte]"),
            "ratings[gte]": searchParams.get("ratings[gte]"),
        };
        console.log("server params: ", queryParams);
        // Проверка актуальности кэшированных данных
        if (
            !queryParams.forceRefresh &&
            cachedData &&
            Date.now() - cacheTime < cacheDuration * 1000
        ) {
            const startIndex = queryParams.offset;
            const endIndex = startIndex + queryParams.limit;
            const slicedData = cachedData.products.slice(startIndex, endIndex);

            const slicedCachedData = {
                ...cachedData,
                products: slicedData,
                productsCount: cachedData.products.length, // Используем полное количество продуктов
            };

            return NextResponse.json(slicedCachedData);
        }

        // Получение свежих данных с бэкэнда (MongoDB), если кэш неактуален или forceRefresh равен true
        const products = await getProducts(req);

        const ads = await getAllAds(req);

        const carouselAds = ads.allAds.filter((ad) => ad.type === "Карусель");
        const listAds = ads.allAds.filter((ad) => ad.type !== "Карусель");
        const shuffledArray = shuffleArray(products.products);
        const productsWithAds = insertAds(shuffledArray, listAds);

        const data = {
            productsCount: products.productsCount,
            filteredProductsCount: products.filteredProductsCount,
            products: productsWithAds,
            carouselAds: carouselAds,
            adsCount: ads.adsCount,
        };

        // Обновление кэша свежими данными
        cachedData = data;
        cacheTime = Date.now();

        // Возвращение первых 10 элементов из кэшированных данных
        const startIndex = queryParams.offset;
        const endIndex = startIndex + queryParams.limit;
        const slicedData = cachedData.products.slice(startIndex, endIndex);
        const slicedFreshData = {
            ...cachedData,
            products: slicedData,
            productsCount: cachedData.products.length, // Используем полное количество продуктов
        };
        return NextResponse.json(slicedFreshData);
    } catch (error) {
        // Обработка ошибок с помощью middleware для ошибок
        onError(error, req);
        return NextResponse.json({ error: "Ошибка при обработке запроса" });
    }
}
