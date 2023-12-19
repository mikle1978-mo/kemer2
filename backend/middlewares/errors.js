import ErrorHandler from "../utils/errorHandler";

export default (err, req, res, next) => {
    let error = err;

    // Если объект запроса NextRequest передан в ошибку, получаем статус из него
    const statusFromRequest =
        error?.response?.data?.statusCode || error?.statusCode || error?.status;

    // Дополнительные проверки, чтобы удостовериться, что error - это объект
    if (!error || typeof error !== "object") {
        error = new ErrorHandler("Internal Server Error", 500);
    }

    // Дополнительные проверки, чтобы удостовериться, что error имеет свойство statusCode
    error.statusCode = statusFromRequest || error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    if (error?.name === "ValidationError") {
        const message = Object.values(error?.errors || {}).map(
            (value) => value.message
        );
        error = new ErrorHandler(message, 400);
    }

    if (error?.code === 11000) {
        const message = `Duplicate ${Object.keys(
            error?.keyValue || {}
        )} entered`;
        error = new ErrorHandler(message, 400);
    }

    // Логирование ошибок
    console.error(error);

    // Возвращение ответа
    res.status(error.statusCode).json({
        success: false,
        error: {
            statusCode: error.statusCode,
            message: error.message,
        },
        stack: process.env.NODE_ENV === "production" ? "🍰" : error.stack,
    });
};
