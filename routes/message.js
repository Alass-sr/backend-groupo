const express = require("express");

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const messageCtrl = require("../controllers/message");



router.post("/", auth, multer, messageCtrl.createMessage);

router.put("/:id", auth, messageCtrl.modifyMessage);

router.get("/:id", auth, messageCtrl.getOneMessage);

router.get("/", auth, messageCtrl.getAllMessage);

router.delete("/:id",auth, messageCtrl.deleteMessage);

module.exports = router;
