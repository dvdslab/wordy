const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255,
  },
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  bio: {
    type: String,
    required: false,
    min: 6,
    max: 1024,
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  avatar: {
    type: String,
    max: 1,
  },
  cloudinary_id: {
    type: String,
    max: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
