const mongoose = require("mongoose");

const MemorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: [25, "Title exceeds character limit"],
    required: [true, "Enter memory title"],
  },
  creator: {
    type: String,
    default: "Anonymous",
    maxlength: [25, "Name exceeds character limit"],
  },
  message: {
    type: String,
    required: true,
    minlength: [10, "Describe your memory (10 char minimum)"],
    maxlength: [150, "Memory description exceeds character limit"],
  },
  tags: {
    type: [String],
    default: ["noTags"],
  },
  file: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Number,
    default: new Date().getTime(),
  },
});

module.exports = mongoose.model("Memory", MemorySchema);
