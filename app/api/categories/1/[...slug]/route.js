// /app/api/category/[...slug]/route.js
import { NextResponse } from "next/server";
import { dbConnect } from "@/backend/config/dbConnect";
import Category from "@/backend/models/categories";

export async function GET(req, { params }) {
    console.log("55555", params);

    const { slug } = params; // массив slug
    console.log("333333", slug);

    await dbConnect(); // Подключение к базе данных

    try {
        // Поиск категории по массиву slug
        const category = await Category.findOne({ slug });

        if (!category) {
            return NextResponse.json(
                { message: "Категория не найдена" },
                { status: 404 }
            );
        }

        // Возвращаем только данные категории, включая SEO
        return NextResponse.json(
            {
                name: category.name,
                seo: category.seo,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Ошибка при поиске категории:", error);
        return NextResponse.json(
            { message: "Ошибка сервера" },
            { status: 500 }
        );
    }
}
