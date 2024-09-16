const TGMessage = function (order) {
    if (order) {
        let message = `<b>Заявка с сайта!</b>\n`;
        message += `<b>ID заказчика: </b>${order.user._id}\n`;
        message += `<b>Имя: </b>${order.user.name}\n`;
        message += `<b>email: </b>${order.user.email}\n`;
        message += `<b>phone: </b>${
            order?.shippingInfo?.phoneNo ? order?.shippingInfo?.phoneNo : ""
        }\n`;
        message += `<b>Метод оплаты: </b>${
            order?.paymentInfo?.method ? order?.paymentInfo?.method : ""
        }\n`;
        message += `<b>Доставка: </b>${
            order?.paymentInfo?.deliveryPaid
                ? order?.paymentInfo?.deliveryPaid
                : ""
        } \n`;
        message += `<b>Сумма: </b>${
            order?.paymentInfo?.totalPaid ? order?.paymentInfo?.totalPaid : ""
        } \n`;

        message += order?.orderItems.map(
            (item) => `<b>Товар: </b>${item.name}; \n`
        );
        fetch(process.env.URI_API_TG, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                chat_id: process.env.CHAT_ID,
                parse_mode: "html",
                text: message,
            }),
        })
            .then((res) => {
                console.log("Запрос отрпавлен. Спасибо за обращение!");
            })
            .catch((err) => {
                console.log("Ошибка при отправке запроса! Попробуйте позже.");
            });
    }
};

export default TGMessage;

// const TGMessage = function (data) {
//     if (typeof data !== "object" || data === null) return;

//     let message = `<b>Заявка с сайта!</b>\n`;

//     for (const [key, value] of Object.entries(data)) {
//         message += `<b>${key}: </b>${value || "Не указан"}\n`;
//     }

//     fetch(process.env.URI_API_TG, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json;charset=utf-8",
//         },
//         body: JSON.stringify({
//             chat_id: process.env.CHAT_ID,
//             parse_mode: "html",
//             text: message,
//         }),
//     })
//         .then(() => {
//             console.log("Запрос отправлен. Спасибо за обращение!");
//         })
//         .catch(() => {
//             console.log("Ошибка при отправке запроса! Попробуйте позже.");
//         });
// };

// export default TGMessage;
