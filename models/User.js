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
  likes: {
    type: [String],
  },
  isAdmin:Boolean
});

module.exports = mongoose.model("User", userSchema);

// Importation de mongoose
// const mongoose = require("mongoose");
// const { isEmail } = require("validator");
// const bcrypt = require("bcrypt");

// Création du Shema
// const userSchema = new mongoose.Schema(
//   {
//     pseudo: {
//       type: String,
//       required: true,
//       minLength: 2,
//       maxLength: 55,
//       unique: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       validate: [isEmail],
//       lowercase: true,
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       max: 1000,
//       minlength: 6,
//     },
//     picture: {
//       type: String,
//       default: "./uploads/profil/random-user.png",
//     },
//     bio: {
//       type: String,
//       max: 1024,
//     },
//     likes: {
//       type: [String],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // fonction qui permet de
// userSchema.pre("save", async function (next) {
//   // salage du password avec bcrypt
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// const UserModel = mongoose.model("user", userSchema);

// module.exports = UserModel;
