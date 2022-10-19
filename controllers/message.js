const Message = require("../models/Message");
const User = require("../models/User");


const path = require("path");
const fs = require("fs");

const log = require("../utils/winston");

exports.createMessage = (req, res, next) => {
  log.info("createMessage");
  log.info(`createMessage req body = ${JSON.stringify(req.body)}`);
  // On stocke les données envoyées par le front-end sous forme de form-data dans une variable en les transformant en objet js
  const messageObject = JSON.parse(req.body.message);

  // On supprime l'id généré automatiquement et envoyé par le front-end. L'id de la sauce est créé par la base MongoDB lors de la création dans la base
  delete messageObject._id;
  // delete messageObject._userId;
  // Création d'une instance du modèle Sauce
  const message = new Message({
    ...messageObject,

    userId: req.auth.userId,
    // On modifie l'URL de l'image
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  // Sauvegarde de la sauce dans la base de données
  message
    .save()
    // On envoi une réponse au frontend avec un statut 201
    .then(() => {
      res.status(201).json({ message: "Message enregistré !" });
    })
    // On ajoute un code erreur en cas de problème
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifyMessage = (req, res, next) => {
  const updatedRecord = {
    message: req.body.message,
  };

  Message.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
  // log.info("modifyMessage");
  // log.info(`modifyMessage req body = ${JSON.stringify(req.body)}`);

  // const messageObject = req.file
  //   ? {
  //       ...JSON.parse(req.body.message),
  //       imageUrl: `${req.protocol}://${req.get("host")}/images/${
  //         req.file.filename
  //       }`,
  //     }
  //   : { ...req.body };

  // delete messageObject._userId;
  // log.info(`modifyMessage req params = ${JSON.stringify(req.params)}`);
  // log.info(`modifyMessage req body = ${JSON.stringify(req.body)}`);
  // log.info(`modifyMessage req auth = ${JSON.stringify(req.auth)}`);

  // Message.findOne({ _id: req.params.id })
  //   .then((message) => {
  //     if (message.userId != req.auth.userId) {
  //       res.status(401).json({ message: "Not authorized" });
  //     } else {
  //       Message.updateOne(
  //         { _id: req.params.id },
  //         { ...messageObject, _id: req.params.id }
  //       )
  //         .then(() => res.status(200).json({ message: "Message modifié!" }))
  //         .catch((error) => res.status(401).json({ error }));
  //     }
  //   })
  //   .catch((error) => {
  //     res.status(400).json({ error });
  //   });
};

exports.getOneMessage = (req, res, next) => {
  Message.findOne({ _id: req.params.id })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllMessage = (req, res, next) => {
  Message.find()
    .then((messages) => res.status(200).json(messages))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {
  Message.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error: " + err);
  });
  // Message.findOne({ _id: req.params.id })
  //   .then((message) => {
  //     if (message.userId != req.auth.userId) {
  //       res.status(401).json({ message: "Not authorized" });
  //     } else {
  //       const filename = message.imageUrl.split("/images/")[1];
  //       fs.unlink(`images/${filename}`, () => {
  //         Message.deleteOne({ _id: req.params.id })
  //           .then(() => {
  //             res.status(200).json({ message: "Message supprimé !" });
  //           })
  //           .catch((error) => res.status(401).json({ error }));
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error });
  //   });
};
exports.likePost = async (req, res) => {
  try {
    await Message.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await User.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.unlikePost = async (req, res) => {
  try {
    await Message.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await User.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

