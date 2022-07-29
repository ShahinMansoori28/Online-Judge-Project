const mongoose = require("mongoose");
ObjectId = mongoose.Types.ObjectId;
const Model = require("../Database/model/problem");

const Job = require("../Database/model/job");
const generateFile = require("../codeCompilation/generateFile");
const { addJobQueue } = require("../codeCompilation/jobQueue");

async function getProblemAll() {
  return await Model.find({});
}

async function getProblemById(id) {
  const problem = await Model.findById(`${id}`);
  return problem;
}

async function getAllJob() {
  return Job.find({}).sort({_id:-1});
}

const ValidId = (id) => ObjectId.isValid(id);

const allProblemsController = async (req, res) => {
  const problems = await getProblemAll();
  res.status(200).json(problems);
};

const detailOfProblemController = async (req, res) => {
  const id = req.params.id;
  try {
    if (!ValidId(id)) return res.status(404).json("check id, it's not valid");
    const problem = await getProblemById(id);
    if (!problem) return res.status(404).json("problem does not exist");
    return res.status(200).json(problem);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const verdictonController = async (req, res) => {
  const { code, testCasesFile, language = "cpp" } = req.body;
  const problemId = req.params.id;
  let job;
  try {

    const problem = await Model.findById(problemId);
    const problemName = problem.name
    const filePath = generateFile(language, code);
    job = await new Job({ language, filePath, testCasesFile, problemId, problemName }).save();
    const jobId = job["_id"];

    addJobQueue(jobId);


    problem["noOfSubmissions"] += 1;
    await problem.save();
    return res.status(201).json({ success: true, jobId });

  } catch (err) {
    return res.status(500).json({ success: false, error: JSON.stringify(err) });
  }
};

const leaderboardController = async (req, res) => {
  let job = await getAllJob();

  console.log(job);
  return res.status(201).json(job);
};

module.exports = {
  allProblemsController,
  detailOfProblemController,
  verdictonController,
  leaderboardController,
};
