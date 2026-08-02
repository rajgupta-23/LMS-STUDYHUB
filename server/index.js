require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const statsRoutes = require("./routes/statsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI);

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5174",
    credentials: true
  })

);
app.use(
  express.json()
);
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.get("/", (req, res) => {
  res.json({ success: true, message:"StudyHub API Running"});
});
app.use("/api/auth",authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments",enrollmentRoutes);
app.use("/api/payment", paymentRoutes);



app.use(

  "/api/users",

  userRoutes

);
app.use("/api/stats", statsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/certificates",certificateRoutes);
app.use("/api/lessons",lessonRoutes);
app.use("/api/about", aboutRoutes);
app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found", url:req.originalUrl});
  }
);
app.use(
  (err, req, res, next) => {
    console.error(
      err.stack
    );
    res.status(500).json({
      success: false,
      message:
        "Server Error"
    });
  }
);
app.listen(
  PORT,
  () => {
    console.log(
      `StudyHub server running on port ${PORT}`
    );
  }
);
