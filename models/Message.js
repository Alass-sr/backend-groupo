const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  
  message: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model("Message", messageSchema);
