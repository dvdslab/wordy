const mongoose = require("mongoose");
const { Schema } = mongoose;

const post_schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
      {
        comment: {
          type: String,
          required: true,
        },
        author: {
          type: String,
        },
      },
    ],
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "author",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", post_schema);

module.exports = { Post };
