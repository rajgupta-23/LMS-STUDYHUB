const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Course = require("../models/Course");

router.get("/", async (req, res) => {
    try {
        const students = await User.countDocuments({
            role: "student"
        });
        const instructors = await User.countDocuments({
            role: "instructor"
        });
        const courses = await Course.countDocuments();

        res.json({
            students,
            instructors,
            courses,
            rating: 4.8
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;
