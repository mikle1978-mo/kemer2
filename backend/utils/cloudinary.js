import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadToCloudinary = async (fileUri, folder) => {
    try {
        const result = await cloudinary.uploader.upload(fileUri, {
            invalidate: true,
            resource_type: "auto",
            folder: folder,
        });

        return {
            public_id: result.public_id,
            url: result.secure_url,
        };
    } catch (error) {
        console.error("Произошла ошибка при загрузке в Cloudinary:", error);
        // Возвращаем ошибку для обработки в вызывающем коде
        throw new Error("Произошла ошибка при загрузке в Cloudinary.");
    }
};

export { uploadToCloudinary, cloudinary };
