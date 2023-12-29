import User from "../models/user";
import { uploads } from "../utils/cloudinary";
import fs from "fs/promises";
import path from "path";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import APIFilters from "../utils/APIFilters";

export const registerUser = async (req, res) => {
    const body = await req.json();
    const user = await User.create(body);

    return {
        user,
    };
};

export const updateProfile = async (req, res) => {
    const formData = await req.formData();
    const file = formData.get("image");
    const name = formData.get("name");
    const email = formData.get("email");
    const newUserData = {
        name: name,
        email: email,
    };
    if (file) {
        const destinationDirPath = path.join(
            process.cwd(),
            "public/images/uploads",
            file.name
        );
        const uploader = async (destinationDirPath) =>
            await uploads(destinationDirPath, "ecomm/avatars");
        // Сохраняем файл в локальную папку
        const fileBuffer = await file.arrayBuffer(); // Используйте arrayBuffer() для получения буфера файла
        fs.writeFile(destinationDirPath, Buffer.from(fileBuffer));
        // Вызываем функцию загрузки в Cloudinary
        const avatarResponse = await uploader(destinationDirPath);

        await fs.unlink(destinationDirPath); // Удаляем локальный файл после загрузки в Cloudinary

        newUserData.avatar = avatarResponse;
    }
    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
    });

    return {
        user,
    };
};

export const updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatched = await bcrypt.compare(
        req.body.currentPassword,
        user.password
    );

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
        sucess: true,
    });
};

export const getUsers = async (req, res) => {
    const resPerPage = 5;
    const usersCount = await User.countDocuments();

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

    const apiFilters = new APIFilters(User.find(), queryStr).pagination(
        resPerPage
    );

    const users = await apiFilters.query;

    return {
        usersCount,
        resPerPage,
        users,
    };
};

export const getUser = async (req, id) => {
    let user = await User.findById(id);

    if (!user) {
        return new ErrorHandler("No user found with this ID", 404);
    }

    return {
        success: true,
        user,
    };
};

export const updateUser = async (req, id) => {
    let user = await User.findById(id);
    console.log("authcontroller update user req", req);
    console.log("authcontroller update user id", id);

    if (!user) {
        return {
            success: false,
            error: new ErrorHandler("No user found with this ID", 404),
        };
    }
    const body = await req.json();

    try {
        user = await User.findByIdAndUpdate(id, body.userData, { new: true });
        return {
            success: true,
            user,
        };
    } catch (error) {
        console.error("Error updating user:", error);
        return {
            success: false,
            error: new ErrorHandler("Error updating user", 500),
        };
    }
};

export const deleteUser = async (req, id) => {
    let user = await User.findById(id);

    if (!user) {
        return new ErrorHandler("No User found with this ID", 404);
    }

    await user.deleteOne();

    return {
        success: true,
    };
};
