const { validatorsResult } = require("express-validator");

const testController = (req, res) => {
  const errors = validatorsResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  return res.status(200).send("success");
};

module.exports = { testController };
