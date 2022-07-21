const path = require("path");
const { exec, spawn } = require("child_process");

function compilationCpp(testCasesFile, directory) {
  const {
    input,
    output,
  } = require(`../testCases/input-output/${testCasesFile}`);

  const outputdirectory = path.join(__dirname, `outputFiles`);
  const newId = path.basename(directory).split(".")[0];
  const outdirectory = path.join(outputdirectory, `${newId}.o`);

  return new Promise((resolve, reject) => {
    exec(`g++ "${directory}" -o "${outdirectory}"`, (error, stdout, stderr) => {
      error && reject({ msg: "on error", error : JSON.stringify(error), stderr });
      stderr && reject({ msg: "on stderr", stderr });

      let passedTestCases = 0;
      input.forEach((inp, index) => {
        const child = spawn(`"${outdirectory}"`, [], {
          shell: true,
        });

        child.stdin.write(inp);
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
              resolve({ msg: "All test cases passed", stdout : JSON.stringify(stdout) });
            }
          }
        });

        child.on("close", (code) => {
          console.log(`child process exited with code ${code}`);
        });
      });
    });
  });
}

module.exports = compilationCpp;
