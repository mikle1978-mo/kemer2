import multer from "multer";
import fs from "fs";

const uploadDirectory = "public/uploads";

// Проверка и создание директории, если её нет
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(
            new Error("Unsupported file format. Upload only JPEG/JPG or PNG"),
            false
        );
    }
};

const upload = multer({
    storage,
    limits: { fieldSize: 1024 * 1024 },
    fileFilter,
});

export default upload;
