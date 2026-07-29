const Enrollment = require("../models/Enrollment");
const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

exports.enroll = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const existing = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (existing) return res.status(409).json({ message: "Already enrolled" });

    const enrollment = await Enrollment.create({ student: req.user._id, course: courseId });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate({
      path: "course",
      populate: { path: "instructor", select: "name" },
    });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.completeLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (!enrollment) return res.status(404).json({ message: "Not enrolled in this course" });

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }
    const totalLessons = await Lesson.countDocuments({ course: courseId });
    enrollment.progress = totalLessons
      ? Math.round((enrollment.completedLessons.length / totalLessons) * 100)
      : 0;
    await enrollment.save();
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
