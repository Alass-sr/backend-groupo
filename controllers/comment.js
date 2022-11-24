const Comment = require("../models/Comment");

const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const jwt = require("jsonwebtoken");

// Create comment
exports.createCommentPost = (req, res, next) => {
  const comment = new Comment({
    postId: req.body.postId,
    text: req.body.text,
    userId: req.body.userId,
  });

  comment
    .save()
    .then(() => {
      res.status(201).json({
        message: "Commentaire enregistré !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });

  // const commentObject = req.body;

  // const postId = req.params.postId;
  // const commenterPseudo = req.body.commenterPseudo;
  // const text = req.body.text;
  // const comment = new Comment({
  //   ...commentObject,
  //   postId: postId,
  //   commenterPseudo: commenterPseudo,
  //   text: text,
  // });

  // comment
  // .save()
  // .then(() => res.status(201).json({ message: "Commentaire enregistré !"}))
  // .catch((error) => res.status(400).json({ error }))
};

// Get One comment

exports.getOneCommentPost = (req, res, next) => {
  Comment.find({
    postId: req.params.id,
  })
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Get all comment
exports.getAllCommentsPost = (req, res, next) => {
  Comment.find()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Delete comment
exports.deleteCommentPost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  Comment.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Supprimé !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
