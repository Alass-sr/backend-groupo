const Message = require('../models/Message');
const fs = require('fs');

exports.createMessage = (req, res, next) => {
    delete req.body._id;
    const message = new Message({
      ...req.body
    })
    message.save()
    .then(() => res.status(201).json({ message: 'message enregistré !'}))
    .catch((error => res.status(400).json({ error })))
  }

  exports.modifyMessage = (req, res, next) => {
    Message.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'message modifié !'}))
    .catch(error => res.status(400).json({ error })); 
  }

  exports.getOneMessage = (req, res, next) => {
    Message.findOne({_id: req.params.id})
    .then(message => res.status(200).json(message))
    .catch(error => res.status(404).json({ error }));
  }

  exports.getAllMessage = (req, res, next) => {
    Message.find()
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }));
  
  }

  exports.deleteMessage = (req, res, next) => {
    Message.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'message supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }