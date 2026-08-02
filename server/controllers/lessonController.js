const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const fs = require("fs");
const path = require("path");

// Get all lessons of course
exports.getLessonsByCourse = async (req, res) => {
    try {
        const lessons = await Lesson.find({
            course: req.params.courseId
        })
            .sort({
                order: 1
            });
        res.json(lessons);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
// Add Lesson
exports.addLesson = async (req, res) => {
    try {
        const course = await Course.findById(
            req.params.courseId
        );
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        if (
            String(course.instructor) !==
            String(req.user._id)
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }
        const lesson = await Lesson.create({
            course: course._id,
            title: req.body.title,
            content: req.body.content,
            order: req.body.order,
            videoUrl: req.file
                ?
                `/uploads/videos/${req.file.filename}`
                :
                ""
        });
        res.status(201).json({
            success: true,
            lesson
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
// Update Lesson
exports.updateLesson = async (req, res) => {
    try {

        const lesson = await Lesson.findById(req.params.lessonId)
            .populate("course");

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        // instructor check
        if (
            String(lesson.course.instructor) !==
            String(req.user._id)
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }
        lesson.title =
            req.body.title || lesson.title;
        lesson.content =
            req.body.content || lesson.content;
        lesson.order =
            req.body.order ?? lesson.order;
        if (req.file) {
            if (lesson.videoUrl) {
                const oldVideo =
                    path.join(
                        process.cwd(),
                        lesson.videoUrl
                    );
                if (fs.existsSync(oldVideo)) {
                    fs.unlinkSync(oldVideo);
                }
            }
            lesson.videoUrl =
                `/uploads/videos/${req.file.filename}`;
        }
        await lesson.save();
        res.json({
            success: true,
            lesson
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.deleteLesson = async (req, res) => {
    try {

        const lesson =
            await Lesson.findById(req.params.lessonId)
                .populate("course");

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }
        // instructor check
        if (
            String(lesson.course.instructor) !==
            String(req.user._id)
        ) {

            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }
        if (lesson.videoUrl) {

            const videoPath =
                path.join(
                    process.cwd(),
                    lesson.videoUrl
                );
            if (fs.existsSync(videoPath)) {
                fs.unlinkSync(videoPath);
            }
        }
        await lesson.deleteOne();
        res.json({
            success: true,
            message: "Lesson deleted"
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
// Get Single Lesson
exports.getLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(
            req.params.lessonId
        )
            .populate(
                "course",
                "title"
            );
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }
        res.json({
            success: true,
            lesson
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};