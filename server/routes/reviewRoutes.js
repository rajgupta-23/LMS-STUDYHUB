const express = require("express");
const router = express.Router();

const {
    addReview,
    getReviews,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/auth");


// Add Review
router.post(
    "/",
    protect,
    addReview
);


// Get Course Reviews
router.get(
    "/:courseId",
    getReviews
);


module.exports = router;