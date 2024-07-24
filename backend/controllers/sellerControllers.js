import Seller from "../models/seller";
import APIFilters from "../utils/APIFilters";
import ErrorHandler from "../utils/errorHandler";

export const newSeller = async (req) => {
    const body = await req.json();

    const seller = await Seller.create(body);
    return {
        seller,
    };
};

export const getSellers = async () => {
    const sellersCount = await Seller.countDocuments();

    let sellers = await Seller.find();

    return {
        sellersCount,
        sellers,
    };
};

export const getAdminSellers = async ({ searchParams }) => {
    const sellersCount = await Seller.countDocuments();

    const apiFilters = new APIFilters(Seller.find(), searchParams)
        .search()
        .filter();

    let sellers = await apiFilters.query;
    const filteredSellersCount = sellers.length;

    // apiFilters.pagination(resPerPage);

    sellers = await apiFilters.query.clone();

    return {
        sellersCount,
        filteredSellersCount,
        sellers,
    };
};

export const getSeller = async (id) => {
    const seller = await Seller.findById(id);
    if (!seller) {
        return new ErrorHandler("Продавец не найден.", 404);
    }

    return {
        seller,
    };
};

export const updateSeller = async (req, id) => {
    let seller = await Seller.findById(id);

    if (!seller) {
        return new ErrorHandler("Продавец не найден.", 404);
    }

    const body = await req.json();

    seller = await Seller.findByIdAndUpdate(id, body);

    return {
        seller,
    };
};

export const deleteSeller = async (id) => {
    let seller = await Seller.findById(id);

    if (!seller) {
        return new ErrorHandler("Продавец не найден.", 404);
    }
    await seller.deleteOne();

    return {
        success: true,
    };
};
