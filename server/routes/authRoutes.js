const express = require("express");
const router = express.Router();
const {
    register,
    login,
    sendResetOTP,
    resetPassword,
    me
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/register",register);
router.post("/login",login);
router.post("/forgot-password",sendResetOTP);
router.post("/reset-password",resetPassword);
router.get("/me",protect,me);
module.exports = router;
