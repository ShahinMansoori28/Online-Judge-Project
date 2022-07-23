const { exec } = require("child_process");

const Docker = () => {
  return new Promise((resolve, reject) => {
    exec("docker run -i -d gcc", (error, stdout, stderr) => {
      error && reject("on error : \n", error, stderr);
      stderr && reject("on stderr : \n", stderr);
      stdout && console.log("on stdout : \n", stdout);
      resolve(stdout.trim());
    });
  });
};

module.exports = Docker;
