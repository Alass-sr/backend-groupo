const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config();

const User = require("../models/User");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "erreur identification/password" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "erreur identification/password" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },

                  `${process.env.SECRET_TOKEN}`,

                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// const UserModel = require("../models/user.model");
// // controle l'authentification du user
// const ObjectID = require("mongoose").Types.ObjectId;

// module.exports.getAllUsers = async (req, res) => {
//   const users = await UserModel.find().select("-password"); // -password suppression du password de l'objet
//   res.status(200).json(users);
// };

// module.exports.getOneUser = async (req, res) => {
//   console.log(req.params);
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID inconnu : " + req.params.id);

//   UserModel.findById(req.params.id, (err, docs) => {
//     if (!err) res.send(docs);
//     else console.log("ID inconnu : " + err);
//   }).select("-password");
// };

// module.exports.updateUser = async (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID inconnu : " + req.params.id);

//   try {
//     await UserModel.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           bio: req.body.bio,
//         },
//       },
//       { new: true, upsert: true, setDefaultsOnInsert: true },
//       (err, docs) => {
//         if (!err) return res.send(docs);
//         if (err) return res.status(500).send({ message: err });
//       }
//     );
//   } catch (err) {
//     return res.status(500).json({ message: err });
//   }
// };

// module.exports.deleteUser = async (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID inconnu : " + req.params.id);

//   try {
//     await UserModel.deleteOne({ _id: req.params.id }).exec();
//     res.status(200).json({ message: " supprimé " });
//   } catch (err) {
//     return res.status(500).json({ message: err });
//   }
// };
