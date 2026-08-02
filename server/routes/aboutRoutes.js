const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Course = require("../models/Course");
const Review = require("../models/Review");


router.get("/", async (req, res) => {
    try {
        const courses = await Course.countDocuments();
        const students = await User.countDocuments({
            role: "student"
        });
        const mentors = await User.countDocuments({
            role: "instructor"
        });
        const reviews = await Review.find();
        let rating = 0;
        if (reviews.length > 0) {
            const total = reviews.reduce(
                (sum, item) => sum + item.rating,
                0
            );
            rating = (total / reviews.length).toFixed(1);
        }
        res.json({
            courses,
            students,
            mentors,
            rating
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;
