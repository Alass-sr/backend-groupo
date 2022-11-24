const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    postId: { type: String },
    text: { type: String },
    userId: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
