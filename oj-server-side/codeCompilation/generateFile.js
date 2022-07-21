const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const generateFile = (language, code) => {
  const newId = uuidv4();
  const directory = path.join(
    __dirname,
    `processingFiles/${newId}.${language}`
  );
  fs.writeFileSync(directory, code);
  return directory;
};
module.exports = generateFile;
