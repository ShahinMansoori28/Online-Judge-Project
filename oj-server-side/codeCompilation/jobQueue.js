const Queue = require("bull");

const jobQueue = new Queue("job-queue");
const NUM_WORKERS = 5;
const Job = require("../Database/model/job");
const compilationCpp = require("../codeCompilation/codeCompilationcpp");
const compilationPy = require("../codeCompilation/codeCompilationpy");
const ProblemSchema = require("../Database/model/problem");
const { findById } = require("../Database/model/problem");

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  console.log(data);
  const { id: jobId } = data;
  const job = await Job.findById(jobId);

  if (job === undefined) {
    throw Error("job not found");
  }
  console.log("Fetched Job", job);

  try {

    let response;
    job["startedAt"] = new Date();
    if (job.language === "cpp") {
      response = await compilationCpp(job.testCasesFile, job.filePath);
    }
    if (job.language === "py") {
      response = await compilationPy(job.testCasesFile, job.filePath);
    }
    console.log("response: ", response);
    job["completedAt"] = new Date();
    job["status"] = "success";
    job["output"] = JSON.stringify(response);

    await job.save();
    const problemId = job.problemId;
    const problem = await ProblemSchema.findById(problemId);
    problem["noOfSuccess"] += 1;
    problem.save();
    //res.status(200).json(response);
  } catch (err) {
    console.log("response: ", err);
    job["completedAt"] = new Date();
    job["status"] = "error";
    job["output"] = JSON.stringify(err);
    await job.save();
    //res.status(400).json(err);
  }

  return true;
});

jobQueue.on("failed", (err) => {
  console.log(err.data.id, "failed", err.failedReason);
});

const addJobQueue = async (jobId) => {
  await jobQueue.add({ id: jobId });
};

module.exports = {
  addJobQueue,
};
