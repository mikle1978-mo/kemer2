import Ads from "../models/ads";
import { cloudinary, uploadToCloudinary } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";
import { NextResponse } from "next/server";

export const newAds = async (req) => {
    const body = await req.json();
    const ads = await Ads.create(body);

    return {
        ads,
    };
};

export const getAdvertisers = async () => {
    const advertisersCount = await Ads.countDocuments();
    const advertisers = await Ads.find().lean();

    return {
        advertisersCount,
        advertisers,
    };
};

export const getAllCarouselAds = async () => {
    const adsCarouselCount = await Ads.countDocuments();
    const allCarouselAds = await Ads.find({ type: "Карусель" }).lean();

    return {
        adsCarouselCount,
        allCarouselAds,
    };
};
export const getAllListAds = async () => {
    const adsCarouselCount = await Ads.countDocuments();
    const allCarouselAds = await Ads.find({ type: "Карусель" }).lean();

    return {
        adsCarouselCount,
        allCarouselAds,
    };
};

export const getOneAds = async (req, id) => {
    const ads = await Ads.findById(id);
    if (!ads) {
        return new ErrorHandler("Ads not found.", 404);
    }

    return {
        ads,
    };
};

export const uploadAdsImages = async (req, id) => {
    let ads = await Ads.findById(id);
    try {
        const data = await req.formData();
        const files = await data.getAll("image");
        if (files.length === 0) {
            console.error("Нет прикрепленных изображений");
            return new ErrorHandler("Нет прикрепленных изображений", 400);
        }
        if (!ads) {
            return new ErrorHandler("Реклама не найден.", 404);
        }
        const uploader = async (fileUri) =>
            await uploadToCloudinary(fileUri, "ecomm/ads");
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
        ads = await Ads.findByIdAndUpdate(id, {
            images: urls,
        });

        return {
            data: urls,
            ads,
        };
    } catch (error) {
        console.error("Error handling form data:", error);
        return new ErrorHandler("Error handling form data", 500);
    }
};

export const updateAds = async (req, id) => {
    let ads = await Ads.findById(id);
    if (!ads) {
        return new ErrorHandler("Реклама не найдена", 404);
    }
    const body = await req.json();
    ads = await Ads.findByIdAndUpdate(id, body);

    return {
        ads,
    };
};

export const deleteAds = async (req, id, next) => {
    let ads = await Ads.findById(id);
    if (!ads) {
        return NextResponse.next(new ErrorHandler("Реклама не найдена.", 404));
    }
    // Deleting images associated with the ads
    for (let i = 0; i < ads.images.length; i++) {
        const res = await cloudinary.uploader.destroy(ads.images[i].public_id);
    }
    await ads.deleteOne();

    return {
        success: true,
    };
};
