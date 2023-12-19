import mongoose from "mongoose";

export async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection.asPromise();
    }

    mongoose.set("strictQuery", false);
    console.log("db______________");
    await mongoose
        .connect(process.env.DB_URI)
        .then(() => console.log("Connected!"));
}
