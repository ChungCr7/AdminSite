const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("Users", userSchema); // Tạo một model với tên là Trips dựa trên schema tripSchema, tạo tên trong database
module.exports = User;
