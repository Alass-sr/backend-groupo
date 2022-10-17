const express = require("express");

const router = express.Router();


const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;

// const authController = require("../controllers/auth.controller");
// const userController = require("../controllers/user.controller");



// User
// router.post("/register", authController.signUp);
// router.post("/login", authController.signIn);
// router.get("/logout", authController.logout);
// router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getOneUser);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);


