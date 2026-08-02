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


router.get( "/course/:courseId", getLessonsByCourse);
router.get("/:lessonId",getLesson);
router.post("/course/:courseId",  protect,requireRole("instructor"),upload.single("videos"),addLesson);
router.put("/:lessonId",   protect,requireRole("instructor"), upload.single("videos"),updateLesson);
router.delete("/:lessonId", protect,requireRole("instructor"), deleteLesson);

module.exports = router;
