import mongoose from "mongoose";

export async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return Promise.resolve(); // Возвращаем завершенный промис, так как соединение уже установлено
    }

    mongoose.set("strictQuery", false);
    console.log("db!!!");

    // Ждем завершения подключения перед возвратом промиса
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected!");
}
