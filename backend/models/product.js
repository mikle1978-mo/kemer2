import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Пожалуйста введите наименование продукта"],
    },
    description: {
        type: String,
        required: [true, "Пожалуйста введите описание продукта"],
    },
    price: {
        type: Number,
        required: [true, "Пожалуйста введите цену продукта"],
    },
    discount: {
        type: Number,
        required: false,
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
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Пожалуйста введите категорию продукта"],
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: [true, "Пожалуйста введите наименование продавца"],
    },
    brand: {
        type: String,
        required: [true, "Пожалуйста введите марку продукта"],
    },
    deliveryTime: {
        type: Number,
        required: [true, "Пожалуйста введите срок доставки"],
        default: 24,
    },
    stock: {
        type: Number,
        required: [true, "Пожалуйста введите количество продукта на складе"],
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
