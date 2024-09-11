import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    slug: {
        type: [String], // Массив строк для полного пути категорий
        required: true,
        index: true, // Индексируем для быстрого поиска по slug
    },
    name: {
        type: String, // Название категории
        required: true,
    },
    description: {
        type: String, // Описание категории
        default: "",
    },
    seo: {
        title: {
            type: String, // SEO-заголовок
            default: "",
        },
        description: {
            type: String, // SEO-описание
            default: "",
        },
        keywords: {
            type: [String], // SEO-ключевые слова в виде массива
            default: [],
        },
    },
});

export default mongoose.models.Category ||
    mongoose.model("Category", categorySchema);
