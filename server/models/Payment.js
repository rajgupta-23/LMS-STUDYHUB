const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema(
    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        course: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Course",

            required: true

        },


        amount: {

            type: Number,

            required: true

        },


        paymentId: {

            type: String,
            sparse: true

        },


        orderId: {

            type: String,

            required: true

        },


        currency: {

            type: String,

            default: "INR"

        },


        status: {

            type: String,

            enum: [
                "pending",
                "success",
                "failed"
            ],

            default: "pending"

        },


        paymentMethod: {

            type: String

        },
        transactionDate: {

            type: Date,

            default: Date.now

        },
        receiptUrl: {
            type: String,
            default: ""
        },
    },

    {
        timestamps: true
    }

);



module.exports = mongoose.model(
    "Payment",
    paymentSchema
);