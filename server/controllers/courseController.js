const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Enrollment = require("../models/Enrollment");

exports.getCourses = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = { published: true };
    if (search) filter.title = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    const courses = await Course.find(filter)
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name email bio");
    if (!course) return res.status(404).json({ message: "Course not found" });
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    res.json({ course, lessons });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, thumbnail, price } = req.body;
    const course = await Course.create({
      title,
      description,
      category,
      thumbnail,
      price,
      instructor: req.user._id,
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    if (String(course.instructor) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not your course" });
    }
    Object.assign(course, req.body);
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    if (String(course.instructor) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not your course" });
    }
    await Lesson.deleteMany({ course: course._id });
    await Enrollment.deleteMany({ course: course._id });
    await course.deleteOne();
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myTaughtCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lessons
exports.addLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    if (String(course.instructor) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not your course" });
    }
    const { title, content, videoUrl, order } = req.body;
    const lesson = await Lesson.create({ course: course._id, title, content, videoUrl, order });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
