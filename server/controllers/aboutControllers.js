const Course = require("../models/Course");
const User = require("../models/User");
const Review = require("../models/Review");



const getAboutStats = async (req, res) => {
    try {
        const courses =
            await Course.countDocuments();
        const students =
            await User.countDocuments({
                role: "student"
            });
        const instructors =
            await User.countDocuments({
                role: "instructor"
            });
        const ratingData =
            await Review.aggregate([

                {
                    $group: {
                        _id: null,
                        avgRating: {
                            $avg: "$rating"
                        }
                    }
                }

            ]);

        const rating =
            ratingData.length > 0
                ?
                ratingData[0].avgRating.toFixed(1)
                :
                "0";
        res.json({
            courses,
            students,
            instructors,
            rating
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    getAboutStats
};
