//user
const express = require("express");
const router = express.Router();
const { loginValidator, registerValidator } = require("../middleware");
const {
  loginController,
  registerController,
  logoutController,
} = require("../controller/users");

router.post("/login", loginValidator, loginController);
router.post("/register", registerValidator, registerController);
router.get("/logout", logoutController);

module.exports = router;
