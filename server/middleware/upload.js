const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload folders
const videoUploadPath = path.join(__dirname, "../uploads/videos");
const avatarUploadPath = path.join(__dirname, "../uploads/avatars");

fs.mkdirSync(videoUploadPath, { recursive: true });
fs.mkdirSync(avatarUploadPath, { recursive: true });

// ================= VIDEO STORAGE =================

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, videoUploadPath);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname)
        );
    },
});

// ================= AVATAR STORAGE =================

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avatarUploadPath);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname)
        );
    },
});

// ================= VIDEO FILTER =================

const videoFilter = (req, file, cb) => {
    const allowedTypes = [
        "video/mp4",
        "video/webm",
        "video/mpeg",
        "video/quicktime",
        "video/x-matroska",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only video files are allowed"), false);
    }
};

// ================= IMAGE FILTER =================

const imageFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

// ================= VIDEO UPLOAD =================

const upload = multer({
    storage: videoStorage,
    fileFilter: videoFilter,
    limits: {
        fileSize: 500 * 1024 * 1024,
    },
});

// ================= AVATAR UPLOAD =================

const avatarUpload = multer({
    storage: avatarStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
});

module.exports = {
    upload,
    avatarUpload,
};