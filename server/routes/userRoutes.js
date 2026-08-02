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

// Get Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, avatarUpload.single("avatar"), updateProfile);

module.exports = router;