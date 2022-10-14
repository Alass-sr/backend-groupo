const express = require("express");
const app = require("../app");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// Authentification
router.post("/register", authController.signUp);

// User
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
