
const mongoose = require("mongoose");


const messageSchema = mongoose.Schema({
  
  message: { type: String, required: true, maxlength: 500, },
  imageUrl: { type: String, required: true },
  video: { type: String,},
  likers: { type: [String], required: true,},
  postId: { type: String, required: true, },
  // comments: {
  //   type: [
  //     {
  //       commenterId: String,
  //       commenterPseudo: String,
  //       text: String,
  //       timestamp:Number,
  //     }
  //   ],
  //   required: true,
  // },
},
{
timestamps: true,
}
  
);

module.exports = mongoose.model("Message", messageSchema);
