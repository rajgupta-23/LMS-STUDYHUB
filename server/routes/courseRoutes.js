const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  myTaughtCourses,
  addLesson,
} = require("../controllers/courseController");
const { protect, requireRole } = require("../middleware/auth");

router.get("/", getCourses);
router.get("/mine", protect, requireRole("instructor"), myTaughtCourses);
router.get("/:id", getCourse);
router.post("/", protect, requireRole("instructor"), createCourse);
router.put("/:id", protect, requireRole("instructor"), updateCourse);
router.delete("/:id", protect, requireRole("instructor"), deleteCourse);
router.post("/:id/lessons", protect, requireRole("instructor"), addLesson);

module.exports = router;
