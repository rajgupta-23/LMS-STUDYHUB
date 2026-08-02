const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Enrollment = require("../models/Enrollment");


exports.getCourses = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = { published: true };
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    const courses = await Course.find(filter)
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });
    const result = await Promise.all(
      courses.map(async (course) => {
        const lessonCount = await Lesson.countDocuments({
          course: course._id,
        });
        return {
          ...course.toObject(),
          lessons: lessonCount,
        };
      })
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {

    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email bio");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    const lessons = await Lesson.find({
      course: course._id,
    }).sort({ order: 1 });
    const relatedCourses = await Course.find({
      category: course.category,
      _id: { $ne: course._id },
      published: true,
    })
      .select("title thumbnail price category rating")
      .limit(4);

    res.json({
      course: {
        ...course.toObject(),
        lessons: lessons.length,
      },
      lessons,
      relatedCourses,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      thumbnail,
      price,
      level,
      duration,
      rating,
      language,
    } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      thumbnail,
      price,
      level,
      duration,
      rating,
      language,
      instructor: req.user._id,
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    if (String(course.instructor) !== String(req.user._id)) {
      return res.status(403).json({
        message: "Not your course",
      });
    }
    Object.assign(course, req.body);
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    if (String(course.instructor) !== String(req.user._id)) {
      return res.status(403).json({
        message: "Not your course",
      });
    }
    await Lesson.deleteMany({
      course: course._id,
    });
    await Enrollment.deleteMany({
      course: course._id,
    });
    await course.deleteOne();
    res.json({
      message: "Course deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.myTaughtCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user._id,
    }).sort({
      createdAt: -1,
    });

    const result = await Promise.all(
      courses.map(async (course) => {
        const lessonCount = await Lesson.countDocuments({
          course: course._id,
        });
        return {
          ...course.toObject(),
          lessons: lessonCount,
        };
      })
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getCategories = async (req, res) => {
  try {
    const categories = await Course.distinct("category");
    res.json({
      success: true,
      categories
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
