import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uri: {
        type: String,
        required: true,
        unique: true,
    },
    parent: {
        type: String,
        default: null,
    },
});

export default mongoose.models.Category ||
    mongoose.model("Category", categorySchema);
