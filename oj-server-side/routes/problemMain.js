const express = require("express");
const router = express.Router();
const exploreinproblem = require("./exploreinproblem");

router.use("/problems", exploreinproblem);
 
module.exports = router;
