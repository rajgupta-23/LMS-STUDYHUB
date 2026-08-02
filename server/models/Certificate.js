const mongoose = require("mongoose");


const certificateSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },


        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },


        certificateId: {
            type: String,
            required: true,
            unique: true,
        },


        issueDate: {
            type: Date,
            default: Date.now,
        },


        status: {
            type: String,
            enum: [
                "completed",
                "revoked"
            ],
            default: "completed",
        },


        pdfUrl: {
            type: String,
            default: "",
        },


        verificationCode: {
            type: String,
            unique: true,
            required: true,
        },


        instructorName: {
            type: String,
            default: "",
        },


    },
    {
        timestamps: true,
    }
);


module.exports =
    mongoose.model(
        "Certificate",
        certificateSchema
    );