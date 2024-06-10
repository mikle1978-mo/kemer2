import mongoose from "mongoose";
import { adsType } from "@/lib/adsType/adsType";

const adsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Please enter product type"],
        enum: {
            values: adsType.map((item) => item.type),
            message: "Please select correct type",
        },
    },
    advertiser: {
        type: String,
        required: [true, "Please enter advertiser"],
    },
    name: {
        type: String,
        required: [true, "Please enter product name"],
    },
    siteUrl: {
        type: String,
        required: [true, "Please enter link"],
    },
    images: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
    ],
    contactName: {
        type: String,
        required: false,
    },
    contactPhone: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Ads || mongoose.model("Ads", adsSchema);
