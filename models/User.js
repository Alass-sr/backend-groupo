const mongoose = require("mongoose");
const { isEmail } = require("validator");


const userSchema = mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 55,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    max: 1000,
    minlength: 6,
  },
  picture: {
    type: String,
    default: "./uploads/profil/random-user.png"
  },
  likes: {
    type: [String],
  },
  isAdmin:Boolean
});

module.exports = mongoose.model("User", userSchema);

