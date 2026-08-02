const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const Certificate = require("../models/Certificate");


const dashboard = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.user._id
        })
            .populate(
                "course",
                "title thumbnail price"
            );
        const certificates = await Certificate.countDocuments({
            user: req.user._id
        });
        const completed = enrollments.filter(
            item => item.progress === 100
        ).length;
        res.json({
            user: {
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            },
            stats: {
                enrolled: enrollments.length,
                completed,
                certificates
            },
            courses: enrollments
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};


const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("-password");

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, email, bio } = req.body;
        const updateData = {
            name,
            email,
            bio,
        };
        if (req.file) {
            updateData.avatar = `/uploads/avatars/${req.file.filename}`;
        }
        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    dashboard,
    getProfile,
    updateProfile,
};
