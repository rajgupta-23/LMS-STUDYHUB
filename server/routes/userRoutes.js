const express = require("express");
const router = express.Router();
const {
    dashboard,
    getProfile,
    updateProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const { avatarUpload } = require("../middleware/upload");
router.get("/dashboard", protect, dashboard);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, avatarUpload.single("avatar"), updateProfile);

module.exports = router;
