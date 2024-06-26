import mongoose from "mongoose";
import { categories } from "@/lib/categoty/category";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
    },
    discount: {
        type: Number,
        required: [false, "Please enter product discount"],
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

    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: categories.map((item) => item.category),
            message: "Please select correct category",
        },
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"],
    },
    brand: {
        type: String,
        required: [true, "Please enter product seller"],
    },
    deliveryPrice: {
        type: Number,
        required: [true, "Pleasr enter delivery price"],
        default: 50,
    },
    deliveryTime: {
        type: Number,
        required: [true, "Please enter delivery time"],
        default: 24,
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
    },
    ratings: {
        type: Number,
        default: 5,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    articul: {
        type: String,
    },
});

export default mongoose.models.Product ||
    mongoose.model("Product", productSchema);
