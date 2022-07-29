const path = require("path");
const { exec, spawn } = require("child_process");
const Docker = require("../DockerRun/startDocker");

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
            ["exec", "-i", `${containerId}`, `./${newId}.o`],
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

function compilationCpp(testCasesFile, directory) {
    const {
        input,
        output,
    } = require(`../testCases/input-output/${testCasesFile}`);

    const newId = path.basename(directory).split(".")[0];

    return new Promise((resolve, reject) => {
        try {
            console.log(containerId, "conta");
            exec(
                `docker cp ${directory} ${containerId}:/${newId}.cpp`,
                (error, stdout, stderr) => {
                    error && reject(error);
                    stderr && reject(stderr);

                    exec(
                        `docker exec ${containerId} g++ "${newId}.cpp" -o "${newId}.o"`,
                        async (error, stdout, stderr) => {
                            error &&
                                reject({
                                    status : "Compilation Error",
                                    msg: "on error",
                                    error: JSON.stringify(error),
                                    stderr,
                                });
                            stderr && reject({ status : "Runtime Error" , msg: "on stderr", stderr });

                            for (let index = 0; index < input.length; index++) {
                                const result = await execution(input[index], newId);
                                if (result !== output[index]) {
                                    return reject({
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
                                stdout: JSON.stringify(stdout),
                            });
                        }
                    );
                }
            );
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = compilationCpp;

/*
  
      */
