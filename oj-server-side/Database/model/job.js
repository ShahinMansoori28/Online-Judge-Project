const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ["cpp", "py"],
  },
  filePath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now(),
  },
  startedAt: {
    type: String,
  },
  completedAt: {
    type: Date,
  },
  output: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "success", "error"],
  },
  testCasesFile: {
    type: String,
    required: true,
  },
  problemId: {
    type: String,
    required: true
  },
  problemName: {
    type: String,
    required: true
  }
});

const Job = new mongoose.model("job", JobSchema);

module.exports = Job;
