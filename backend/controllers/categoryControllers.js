import Category from "../models/categories";
import ErrorHandler from "../utils/errorHandler";

export const getCategories = async () => {
    const categories = await Category.find();

    if (!categories) {
        return new ErrorHandler("Категории не найдены.", 404);
    }
    return {
        categories,
    };
};

export const getCategory = async (id) => {
    const category = await Category.findById(id);

    if (!category) {
        return new ErrorHandler("Категория не найдена.", 404);
    }
    return {
        category,
    };
};

export const newCategory = async (req) => {
    const body = await req.json();
    const category = await Category.create(body);

    return {
        category,
    };
};

export const updateCategory = async (req, id) => {
    let category = await Category.findById(id);
    if (!category) {
        return new ErrorHandler("Категория не найдена", 404);
    }
    const body = await req.json();
    category = await Category.findByIdAndUpdate(id, body);

    return {
        category,
    };
};

export const deleteCategory = async (req, id) => {
    let category = await Category.findById(id);
    if (!category) {
        return NextResponse.next(
            new ErrorHandler("Категория не найдена.", 404)
        );
    }

    await category.deleteOne();

    return {
        success: true,
    };
};
