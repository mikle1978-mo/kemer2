export const getPriceQueryParams = (queryParams, key, value) => {
    const hasValueInParam = queryParams.has(key);

    if (value && hasValueInParam) {
        queryParams.set(key, value);
    } else if (value) {
        queryParams.append(key, value);
    } else if (hasValueInParam) {
        queryParams.delete(key);
    }
    return queryParams;
};

export const parseCallbackUrl = (url) => {
    const res = url.replace(/%3A/g, ":").replace(/%2F/g, "/");
    return res;
};

export const getUserReview = (reviews, userId) => {
    let userReview = null;

    reviews.forEach((review) => {
        if (review?.user?._id === userId) {
            userReview = review;
        }
    });

    return userReview;
};

export const getCookieName = () => {
    let cookieName = "";

    if (process.env.NODE_ENV === "development") {
        cookieName = "next-auth.session-token";
    }

    if (process.env.NODE_ENV === "production") {
        cookieName = "__Secure-next-auth.session-token";
    }

    return cookieName;
};

export const insertAds = (products, ads, interval = 5) => {
    let i = interval;
    while (i < products.length) {
        const ad = ads.shift(); // Извлекаем следующий рекламный блок
        if (ad) {
            products.splice(i, 0, ad); // Вставляем рекламный блок в массив продуктов
            i += interval + 1; // Увеличиваем индекс для следующего интервала
        } else {
            break; // Прекращаем вставку, если рекламных блоков больше нет
        }
    }
    return products;
};

export function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ];
    }
    return shuffledArray;
}

export function byField(fieldName) {
    return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
}

export const lifeFilter = function (keyword, data) {
    if (!keyword) {
        return data;
    }
    return data.filter(({ name }) => {
        name.toLowerCase().includes(keyword.toLowerCase());
    });
};

export const getCategoryName = (categoryId, categories) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Неизвестная категория";
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};
