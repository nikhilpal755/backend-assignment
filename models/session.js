const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    dean: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dean",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: " Student",
    },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
    data: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;