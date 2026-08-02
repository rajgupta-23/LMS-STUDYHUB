const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(

  {
    name: {
      type: String,
      required: true,
      trim: true
    },


    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },


    password: {
      type: String,
      required: true
    },


    dateOfBirth: {
      type: Date,
      required: true
    },


    role: {
      type: String,
      enum: [
        "student",
        "instructor"
      ],
      default: "student"
    },


    bio: {
      type: String,
      default: ""
    },


    resetOTP: {
      type: String,
      default: null
    },


    resetOTPExpire: {
      type: Date,
      default: null
    }


  },

  {
    timestamps: true
  }

);



// Password Hash

userSchema.pre(
  "save",
  async function (next) {


    if (!this.isModified("password")) {
      return next();
    }


    const salt =
      await bcrypt.genSalt(10);


    this.password =
      await bcrypt.hash(
        this.password,
        salt
      );


    next();


  });




// Compare Password

userSchema.methods.comparePassword =
  async function (password) {

    return await bcrypt.compare(
      password,
      this.password
    );

  };




// Safe User

userSchema.methods.toSafeObject =
  function () {

    return {

      _id: this._id,

      name: this.name,

      email: this.email,

      dateOfBirth: this.dateOfBirth,

      role: this.role,

      bio: this.bio,

      createdAt: this.createdAt

    };


  };



module.exports =
  mongoose.model(
    "User",
    userSchema
  );