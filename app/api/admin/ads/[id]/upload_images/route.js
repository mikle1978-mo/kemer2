import onError from "@/backend/middlewares/errors";
import { NextResponse } from "next/server";
import {
    isAuthenticatedUser,
    authorizeRoles,
} from "@/backend/middlewares/auth";
import { dbConnect } from "@/backend/config/dbConnect";
import upload from "@/backend/utils/multer";
import { uploadAdsImages } from "@/backend/controllers/adsControllers";

export async function POST(req, { params }) {
    dbConnect();
    try {
        await isAuthenticatedUser(req); // Проверяем авторизацию
        authorizeRoles(req, "admin"); // Проверяем роль админа

        // Используем upload.array, чтобы получить middleware для обработки файлов
        const uploadMiddleware = upload.array("image");

        // Вызываем промежуточное ПО для обработки данных формы
        const data = await new Promise((resolve, reject) => {
            uploadMiddleware(req, null, async (error) => {
                try {
                    const productData = await uploadAdsImages(req, params.id);

                    if (!productData) {
                        reject(
                            new Error(
                                "uploadProductImages did not return valid data"
                            )
                        );
                    }
                    resolve(productData);
                } catch (uploadError) {
                    console.error("Error handling form data:", uploadError);
                    reject(new Error("Error handling form data"));
                }
            });
        });

        // Возвращаем NextResponse с данными о продукте
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return onError(req, error);
    }
}

export const api = {
    bodyParser: false,
};
