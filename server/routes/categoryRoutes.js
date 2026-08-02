const express = require("express");
const router = express.Router();

const Course = require("../models/Course");


router.get("/", async (req, res) => {

    try {

        const categories = await Course.distinct("category");

        res.json(categories);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;