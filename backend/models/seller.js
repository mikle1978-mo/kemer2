import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter sallers name"],
    },
    email: {
        type: String,
        required: [true, "Please enter sallers email"],
    },
    phoneNo: {
        type: String,
        required: [true, "Please enter sallers phone number"],
    },
    address: {
        type: String,
        required: [true, "Please enter sallers address"],
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Seller || mongoose.model("Seller", sellerSchema);
