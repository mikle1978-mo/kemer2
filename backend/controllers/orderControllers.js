import Order from "../models/order";
import APIFilters from "../utils/APIFilters";
import ErrorHandler from "../utils/errorHandler";

export const newOrder = async (req, res) => {
    const body = await req.json();
    const order = await Order.create(body);

    return {
        order,
    };
};

export const getOrders = async () => {
    const ordersCount = await Order.countDocuments();

    const orders = await Order.find().populate("shippingInfo user");

    return {
        ordersCount,
        orders,
    };
};

export const getOrder = async (req, id, res) => {
    const order = await Order.findById(id).populate("shippingInfo user");

    if (!order) {
        return new ErrorHandler("No Order found with this ID", 404);
    }

    return {
        order,
    };
};

export const myOrders = async (req, res) => {
    const ordersCount = await Order.countDocuments();

    const orders = await Order.find({ user: req.user._id })
    .populate("shippingInfo user");

    return {
        ordersCount,
        orders,
    };
};

export const updateOrder = async (req, id, res) => {
    let order = await Order.findById(id);

    if (!order) {
        return next(new ErrorHandler("No Order found with this ID", 404));
    }
    const body = await req.json();

    order = await Order.findByIdAndUpdate(id, body);

    return {
        success: true,
        order,
    };
};

export const deleteOrder = async (req, id, res) => {
    let order = await Order.findById(id);

    if (!order) {
        return new ErrorHandler("No Order found with this ID", 404);
    }

    await order.deleteOne();

    return {
        success: true,
    };
};

export const canReview = async (req) => {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const productId = searchParams.get("productId");

    const orders = await Order.find({
        user: req?.user?._id,
        "orderItems.product": productId,
    });

    let canReview = orders?.length >= 1 ? true : false;

    return {
        canReview,
    };
};

export const checkoutSession = async (req, res) => {
    const body = await req.json();
    body.user = req.user;

    const shippingInfo = body?.shippingInfo;

    const paymentInfo = {
        status: "в процессе",
        method: body.paymentMethod,
        amountPaid: body?.checkoutInfo.totalAmount,
        taxPaid: body?.checkoutInfo.tax,
    };

    const orderData = {
        user: body.user,
        shippingInfo,
        paymentInfo,
        orderItems: body.items,
    };

    // const order = await Order.create(orderData);

    return {
        orderData,
    };
};
