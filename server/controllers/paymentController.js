const crypto = require("crypto");

const razorpay = require("../config/razorpay");

const Payment = require("../models/Payment");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");




// CREATE ORDER

const createOrder = async (req, res) => {

    try {

        console.log("USER:", req.user);
        console.log("BODY:", req.body);


        const { courseId } = req.body;


        if (!courseId) {
            return res.status(400).json({
                message: "Course ID required"
            });
        }


        const course = await Course.findById(courseId);


        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }


        console.log("COURSE:", course);



        if (!course.price) {
            return res.status(400).json({
                message: "Course price missing"
            });
        }



        const options = {

            amount: Number(course.price) * 100,

            currency: "INR",

            receipt:
                "receipt_" + Date.now()

        };



        console.log("RAZORPAY ORDER OPTIONS:", options);



        const order =
            await razorpay.orders.create(options);



        console.log(
            "RAZORPAY ORDER:",
            order
        );

        const payment =
            await Payment.create({

                user: req.user._id,

                course: course._id,

                amount: Number(course.price),

                orderId: order.id,

                status: "pending"

            });
        res.status(200).json({

            success: true,

            order,

            paymentId: payment._id,

            key: process.env.RAZORPAY_KEY_ID

        });



    }
    catch (error) {

        console.log(
            "CREATE ORDER ERROR:",
            error
        );


        res.status(500).json({

            message: error.message

        });

    }

};








// VERIFY PAYMENT


const verifyPayment = async (req, res) => {


    try {


        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature,

            paymentMongoId


        } = req.body;





        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;





        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(body)
                .digest("hex");





        if (expectedSignature !== razorpay_signature) {


            return res.status(400).json({

                message: "Invalid payment signature"

            });


        }






        const payment =
            await Payment.findById(paymentMongoId);





        if (!payment) {


            return res.status(404).json({

                message: "Payment record not found"

            });


        }






        payment.paymentId =
            razorpay_payment_id;


        payment.status =
            "success";


        await payment.save();








        const alreadyEnrolled =
            await Enrollment.findOne({

                student: req.user._id,

                course: payment.course

            });






        if (!alreadyEnrolled) {


            await Enrollment.create({

                student: req.user._id,

                course: payment.course,

                progress: 0,

                completedLessons: []

            });


        }







        res.json({

            success: true,

            message:
                "Payment successful and course enrolled"

        });





    } catch (error) {


        console.log("VERIFY ERROR:", error);



        res.status(500).json({

            message: error.message

        });


    }


};









// PAYMENT HISTORY


const paymentHistory = async (req, res) => {


    try {


        const payments =
            await Payment.find({

                user: req.user._id

            })
                .populate(
                    "course",
                    "title price"
                )
                .sort({

                    createdAt: -1

                });




        res.json(payments);



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


};







module.exports = {

    createOrder,

    verifyPayment,

    paymentHistory

};