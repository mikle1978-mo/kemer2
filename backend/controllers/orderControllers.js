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

export const getOrders = async (req, res) => {
    const resPerPage = 2;
    const ordersCount = await Order.countDocuments();

    const apiFilters = new APIFilters(Order.find(), req.query).pagination(
        resPerPage
    );

    const orders = await apiFilters.query.find().populate("shippingInfo user");

    res.status(200).json({
        ordersCount,
        resPerPage,
        orders,
    });
};

export const getOrder = async (req, res) => {
    const order = await Order.findById(req.query.id).populate(
        "shippingInfo user"
    );

    if (!order) {
        return next(new ErrorHandler("No Order found with this ID", 404));
    }

    res.status(200).json({
        order,
    });
};

export const myOrders = async (req, res) => {
    const resPerPage = 10;
    const ordersCount = await Order.countDocuments();
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const queryParams = {
        keyword: searchParams.get("keyword"),
        page: searchParams.get("page"),
        category: searchParams.get("category"),
        "price[gte]": searchParams.get("price[gte]"),
        "price[lte]": searchParams.get("price[lte]"),
        "ratings[gte]": searchParams.get("ratings[gte]"),
    };

    let queryStr = Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v != null)
    );

    const apiFilters = new APIFilters(Order.find(), queryStr).pagination(
        resPerPage
    );

    const orders = await apiFilters.query
        .find({ user: req.user._id })
        .sort({ createAt: -1 })
        .populate("shippingInfo user");

    return {
        ordersCount,
        resPerPage,
        orders,
    };
};

export const updateOrder = async (req, res) => {
    let order = await Order.findById(req.query.id);

    if (!order) {
        return next(new ErrorHandler("No Order found with this ID", 404));
    }

    order = await Order.findByIdAndUpdate(req.query.id, {
        orderStatus: req.body.orderStatus,
    });

    res.status(200).json({
        success: true,
        order,
    });
};

export const deleteOrder = async (req, res) => {
    let order = await Order.findById(req.query.id);

    if (!order) {
        return next(new ErrorHandler("No Order found with this ID", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
    });
};

export const canReview = async (req, res) => {
    const productId = req.query.productId;

    const orders = await Order.find({
        user: req?.user?._id,
        "orderItems.product": productId,
    });

    let canReview = orders?.length >= 1 ? true : false;

    res.status(200).json({
        canReview,
    });
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
