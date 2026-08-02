const express = require("express");
const router = express.Router();

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  myTaughtCourses,
  getCategories
} = require("../controllers/courseController");

const {
  protect,
  requireRole
} = require("../middleware/auth");

router.get("/", getCourses);
router.get("/categories/list", getCategories);
router.get(
  "/mine",
  protect,
  requireRole("instructor"),
  myTaughtCourses
);
router.get("/:id", getCourse);
router.post(
  "/",
  protect,
  requireRole("instructor"),
  createCourse
);

router.put(
  "/:id",
  protect,
  requireRole("instructor"),
  updateCourse
);
router.delete(
  "/:id",
  protect,
  requireRole("instructor"),
  deleteCourse
);

module.exports = router;