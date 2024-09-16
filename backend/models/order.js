import mongoose from "mongoose";
import Address from "./address";
import User from "./user";

const orderSchema = mongoose.Schema({
    shippingInfo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Address",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
        },
    ],
    paymentInfo: {
        status: {
            type: String,
            default: "Не оплачен",
        },
        method: {
            type: String,
            required: true,
        },
        taxPaid: {
            type: Number,
        },
        deliveryPaid: {
            type: Number,
            required: true,
        },
        amountPaid: {
            type: Number,
            required: true,
        },
        totalPaid: {
            type: Number,
            required: true,
        },
    },
    orderStatus: {
        type: String,
        default: "В процессе",
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
