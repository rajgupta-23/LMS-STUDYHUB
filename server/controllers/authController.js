const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const mailer = require("../config/mail");

const signToken = (id) => {
  return jwt.sign(
    {
      id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );

};
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      dateOfBirth,
      role
    } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !dateOfBirth
    ) {
      return res.status(400).json({
        message: "All fields required"
      });
    }
    const exists =
      await User.findOne({
        email
      });
    if (exists) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }
    const user =
      await User.create({
        name,
        email,
        password,
        dateOfBirth,
        role:
          role === "instructor"
            ?
            "instructor"
            :
            "student"
      });
    const token =
      signToken(user._id);
    res.status(201).json({
      token,
      user: user.toSafeObject()
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user =
      await User.findOne({
        email
      });
    if (
      !user ||
      !(await user.comparePassword(password))
    ) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    const token =
      signToken(user._id);
    res.json({
      token,
      user: user.toSafeObject()
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.sendResetOTP =
  async (req, res) => {
    try {
      const {
        email
      } = req.body;
      const user =
        await User.findOne({
          email
        });
      if (!user) {
        return res.status(404).json({
          message: "Email not found"
        });
      }
      const otp =
        Math.floor(
          100000 +
          Math.random() * 900000
        ).toString();
      user.resetOTP = otp;
      user.resetOTPExpire =
        Date.now() + 10 * 60 * 1000;
      await user.save();
      await mailer.sendMail({
        from: '"StudyHub" <ry0984231@gmail.com>',
        to: user.email,
        subject: "StudyHub Password Reset OTP",
        html: `
    <div style="font-family:Arial,sans-serif">
      <h2>StudyHub Password Reset</h2>
      <p>Hello ${user.name},</p>
      <p>Your OTP is:</p>
      <h1 style="color:#2563eb;">${otp}</h1>
      <p>This OTP is valid for <b>10 minutes</b>.</p>
    </div>
  '
      });
      res.json({
        message: "OTP sent successfully"
      });
    }
    catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
exports.resetPassword =
  async (req, res) => {
    try {
      const {
        email,
        otp,
        dateOfBirth,
        newPassword
      } = req.body;
      const user =
        await User.findOne({
          email
        });
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      if (user.resetOTP !== otp) {
        return res.status(400).json({
          message: "Invalid OTP"
        });
      }
      if (
        user.resetOTPExpire <
        Date.now()
      ) {
        return res.status(400).json({
          message: "OTP expired"
        });
      }
      const dob =
        new Date(
          user.dateOfBirth
        )
          .toISOString()
          .split("T")[0];
      if (
        dob !== dateOfBirth
      ) {
        return res.status(400).json({
          message: "DOB not matched"
        });
      }
      user.password =
        newPassword;
      user.resetOTP = null;
      user.resetOTPExpire = null;
      await user.save();
      res.json({
        message:
          "Password changed successfully"
      });
    }
    catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
exports.me =
  async (req, res) => {
    res.json({
      user: req.user.toSafeObject()
    });
  };
