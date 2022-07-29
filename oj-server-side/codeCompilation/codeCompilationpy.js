const { spawn, exec } = require("child_process");
const path = require("path");
const Docker = require("../DockerRun/startDockerPy");

let containerId = null;
Docker()
  .then((res) => {
    containerId = res;
  })
  .catch((err) => {
    console.log(err);
  });

function execution(input, newId) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "docker",
      ["exec", "-i", `${containerId}`, "python", `${newId}.py`],
      {
        shell: true,
      }
    );

    child.stdin.write(input);
    child.stdin.end();
    child.on("error", (error) => {
      reject({ msg: "on error", error: JSON.stringify(error) });
    });

    child.stderr.on("data", (data) => {
      reject({ msg: "on stderr", stderr: `${data}` });
    });

    child.stdout.on("data", (data) => {
      const result = `${data}`.trim();
      resolve(result);
    });

    child.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
}

function compilationPy(testCasesFile, directory) {
  const {
    input,
    output,
  } = require(`../testCases/input-output/${testCasesFile}`);

  const newId = path.basename(directory).split(".")[0];
  return new Promise((resolve, reject) => {
    try {
      exec(
        `docker cp ${directory} ${containerId}:/${newId}.py`,
        async (error, stdout, stderr) => {
          error && reject(error);
          stderr && resolve(stderr);

          for (let index = 0; index < input.length; index++) {
            const result = await execution(input[index], newId);
            if (result !== output[index]) {
              reject({
                status : "Wrong Answer",
                msg: `incorrect output at test case ${index + 1}`,
                input: `${input[index]}`,
                output: `${output[index]}`,
                yourOutput: `${result}`,
              });
            }
          }
          resolve({
            status : "Problem Solved Successfully",
            msg: "All test cases passed",
            //stdout: JSON.stringify(stdout),
          });
        }
      );
    } catch (err) {
      console.log("Python error : ", err);
    }
  });
}

module.exports = compilationPy;

/*
 
      */
