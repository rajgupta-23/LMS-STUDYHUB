const Review = require("../models/Review");
const addReview = async (req, res) => {
    try {
        const { courseId, rating, comment } = req.body;
        const review = await Review.create({
            user: req.user._id,
            course: courseId,
            rating,
            comment,
        });
        res.status(201).json({
            success: true,
            review,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            course: req.params.courseId,
        })
            .populate("user", "name");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
module.exports = {
    addReview,
    getReviews,
};
