import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = async (file, folder) => {
    console.log("cloudinary uploads folder", folder); // Добавьте эту строку для отладки
    try {
        const result = await cloudinary.v2.uploader.upload(file, {
            resource_type: "auto",
            folder: folder,
        });
        console.log("cloudinary uploads result", result);
        return {
            public_id: result.public_id,
            url: result.url,
        };
    } catch (error) {
        throw error;
    }
};

export { uploads, cloudinary };
