const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
    maxLength: 40,
    trim: true,
  },
  day: {
    type: String,
    required: [true, "Day cannot be empty"],
    maxLength: 20,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
