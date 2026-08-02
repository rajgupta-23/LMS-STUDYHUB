const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/upload");

const {
    addLesson,
    getLessonsByCourse,
    updateLesson,
    deleteLesson,
    getLesson,
} = require("../controllers/lessonController");

const {
    protect,
    requireRole,
} = require("../middleware/auth");

// Get all lessons of a course
router.get(
    "/course/:courseId",
    getLessonsByCourse
);

// Get single lesson
router.get(
    "/:lessonId",
    getLesson
);

// Add lesson
router.post(
    "/course/:courseId",
    protect,
    requireRole("instructor"),
    upload.single("videos"),
    addLesson
);

// Update lesson
router.put(
    "/:lessonId",
    protect,
    requireRole("instructor"),
    upload.single("videos"),
    updateLesson
);

// Delete lesson
router.delete(
    "/:lessonId",
    protect,
    requireRole("instructor"),
    deleteLesson
);

module.exports = router;