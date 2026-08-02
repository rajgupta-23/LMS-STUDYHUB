const express = require("express");
const router = express.Router();

const {
    generateCertificate,
    getMyCertificates,
    verifyCertificate,
} = require("../controllers/certificateController");

const { protect } = require("../middleware/auth");

router.post("/generate/:courseId", protect, generateCertificate);
router.get("/my-certificates", protect, getMyCertificates);
router.get("/verify/:certificateId", verifyCertificate);

module.exports = router;