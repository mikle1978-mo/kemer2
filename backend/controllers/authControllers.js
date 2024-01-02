import User from "../models/user";
import { uploadToCloudinary } from "../utils/cloudinary";
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
    const data = await req.formData();
    const name = await data.get("name");
    const email = await data.get("email");
    const image = await data.get("image");
    const newUserData = {
        name: name,
        email: email,
    };
    if (image) {
        const fileBuffer = await image.arrayBuffer();
        let mime = image.type;
        let encoding = "base64";
        let base64Data = Buffer.from(fileBuffer).toString("base64");
        let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;
        const uploader = async (fileUri) =>
            await uploadToCloudinary(fileUri, "ecomm/avatars");
        try {
            const avatarResponse = await uploader(fileUri);
            newUserData.avatar = avatarResponse;
        } catch (error) {
            console.error(error);
        }
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
    });

    return {
        user,
    };
};

export const updatePassword = async (req, res) => {
    const body = await req.json();
    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatched = await bcrypt.compare(
        body.currentPassword,
        user.password
    );
    if (!isPasswordMatched) {
        return new ErrorHandler("Old password is incorrect", 400);
    }

    user.password = body.newPassword;
    await user.save();

    return {
        success: true,
    };
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
