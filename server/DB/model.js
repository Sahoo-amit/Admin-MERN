const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  isAdmin: {
    default: false,
    type: Boolean,
  },
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        isAdmin: this.isAdmin,
        email: this.email,
        userId: this._id.toString(),
      },
      process.env.JSONTOKEN,
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User
