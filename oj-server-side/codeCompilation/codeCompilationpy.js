const { spawn } = require("child_process");
const Docker = require("../DockerRun/startDocker");

let containerId = null;
Docker()
  .then((res) => {
    containerId = res;
  })
  .catch((err) => {
    console.log(err);
  });

function compilationPy(testCasesFile, directory) {
  const {
    input,
    output,
  } = require(`../testCases/input-output/${testCasesFile}`);

  return new Promise((resolve, reject) => {
    let passedTestCases = 0;
    for(let index = 0; index < input.length; index++) {
      const child = spawn(`python "${directory}"`, [], {
        shell: true,
      });

      child.stdin.write(input[index]);
      child.stdin.end();
      child.on("error", (error) => {
        reject({ msg: "on error", error: JSON.stringify(error) });
      });

      child.stderr.on("data", (data) => {
        reject({ msg: "on stderr", stderr: `${data}` });
      });

      child.stdout.on("data", (data) => {
        const result = `${data}`.trim();
        if (result !== output[index]) {
          reject({
            msg: `incorrect output at test case ${index + 1}`,
            input: `${inp}`,
            output: `${output[index]}`,
            yourOutput: `${result}`,
          });
        } else {
          passedTestCases += 1;
          if (passedTestCases === input.length) {
            resolve({
              msg: "All test cases passed",
              stdout: JSON.stringify(stdout),
            });
          }
        }
      });

      child.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
      });
    }
  });
}

module.exports = compilationPy;
