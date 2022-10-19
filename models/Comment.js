const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postId: { type: String, },
  commenterPseudo: { type: String, },
  text: { type: String, },
  userId: { type: String, },
  timestamp: { type: Number, },
});

module.exports = mongoose.model("Comment", commentSchema);
