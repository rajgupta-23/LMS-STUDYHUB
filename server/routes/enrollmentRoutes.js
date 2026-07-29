const express = require("express");
const router = express.Router();
const { enroll, myEnrollments, completeLesson } = require("../controllers/enrollmentController");
const { protect, requireRole } = require("../middleware/auth");

router.post("/", protect, requireRole("student"), enroll);
router.get("/mine", protect, requireRole("student"), myEnrollments);
router.post("/complete-lesson", protect, requireRole("student"), completeLesson);

module.exports = router;
