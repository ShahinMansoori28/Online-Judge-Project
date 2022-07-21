const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const { testController } = require("../controller/test");
const { middlewareValidator } = require("../middleware");

router.get("v1", middlewareValidator, testController);

module.exports = router;
