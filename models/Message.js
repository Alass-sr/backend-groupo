const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number },
});

module.exports = mongoose.model("Message", messageSchema);
