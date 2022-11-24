const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

// Comments
router.post("/", auth, commentCtrl.createCommentPost);
router.get("/", auth, commentCtrl.getAllCommentsPost);
router.get("/:id", auth, commentCtrl.getOneCommentPost);
router.delete("/:id", auth, commentCtrl.deleteCommentPost);

module.exports = router;
