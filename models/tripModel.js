const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    tripName: { type: String, required: true },
    time: { type: Date, required: true },
    days: { type: Number, required: true },
    price: { type: Number, required: true },
    avatar: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
