import Address from "../models/address";
import ErrorHandler from "../utils/errorHandler";

export const newAddress = async (req, res) => {
    const body = await req.json();
    body.user = req.user._id;
    const address = await Address.create(body);

    return {
        address,
    };
};

export const getAddresses = async (req, res) => {
    console.log("0000getadress controller0000", req);
    const addresses = await Address.find({ user: req.user._id });
    return {
        addresses,
    };
};

export const getAddress = async (req, id) => {
    const address = await Address.findById(id);

    if (!address) {
        return next(new ErrorHandler("Address not found", 404));
    }

    return {
        address,
    };
};

export const updateAddress = async (req, id, res) => {
    let address = await Address.findById(id);

    if (!address) {
        return next(new ErrorHandler("Address not found", 404));
    }

    const body = await req.json();

    address = await Address.findByIdAndUpdate(id, body);

    return {
        address,
    };
};

export const deleteAddress = async (req, id, res) => {
    let address = await Address.findById(id);

    if (!address) {
        return next(new ErrorHandler("Address not found", 404));
    }
    await address.deleteOne();

    return {
        success: true,
    };
};
