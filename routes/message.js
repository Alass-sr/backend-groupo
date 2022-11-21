const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const admin = require("../middleware/admin");

const messageCtrl = require("../controllers/message");

router.post("/", auth, multer, messageCtrl.createMessage);

router.put("/:id", auth, multer, messageCtrl.modifyMessage);

router.get("/:id", auth, messageCtrl.getOneMessage);

router.get("/", auth, messageCtrl.getAllMessage);

router.delete("/:id", [auth, admin], messageCtrl.deleteMessage);

//like_unlike
router.patch("/like-post/:id", messageCtrl.likePost);
router.patch("/unlike-post/:id", messageCtrl.unlikePost);

module.exports = router;
