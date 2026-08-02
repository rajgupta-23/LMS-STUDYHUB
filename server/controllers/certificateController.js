const fs = require("fs");
const Certificate = require("../models/Certificate");
const Course = require("../models/Course");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const generatePDF = require("../utils/generateCertificate");
const generateQRCode = require("../utils/qrGenerator");
const uploadCertificate = require("../utils/uploadCertificate");
const { v4: uuidv4 } = require("uuid");



exports.generateCertificate = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
        const enrollment =
            await Enrollment.findOne({
                student: userId,
                course: courseId
            });
        if (!enrollment) {
            return res.status(400).json({
                success: false,
                message: "You are not enrolled"
            });
        }
        if (enrollment.progress < 100) {
            return res.status(400).json({
                success: false,
                message: "Complete course first"
            });
        }
        const existing =
            await Certificate.findOne({
                user: userId,
                course: courseId
            });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Certificate already generated",
                certificate: existing
            });
        }
        const certificateId =
            `CERT-${uuidv4()
                .slice(0, 8)
                .toUpperCase()}`;
        const qrCode =
            await generateQRCode(certificateId);
        const pdfPath =
            await generatePDF(
                user.name,
                course.title,
                certificateId,
                new Date(),
                qrCode
            );
        const pdfUrl =
            await uploadCertificate(
                pdfPath,
                certificateId
            );
        const certificate =
            await Certificate.create({
                user: userId,
                course: courseId,
                certificateId,
                verificationCode: uuidv4(),
                instructorName:
                    course.instructorName || "",
                pdfUrl,
                issueDate: new Date()
            });
        if (fs.existsSync(pdfPath)) {
            fs.unlinkSync(pdfPath);
        }
        res.status(201).json({
            success: true,
            message: "Certificate generated successfully",
            certificate
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getMyCertificates = async (req, res) => {
    try {
        const certificates =
            await Certificate.find({
                user: req.user.id
            })
                .populate(
                    "course",
                    "title thumbnail"
                );
        res.json({
            success: true,
            certificates
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.verifyCertificate = async (req, res) => {
    try {
        const { certificateId } = req.params;
        const certificate =
            await Certificate.findOne({
                certificateId
            })
                .populate(
                    "user",
                    "name email"
                )
                .populate(
                    "course",
                    "title"
                );
        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });
        }
        res.json({
            success: true,
            certificate
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
