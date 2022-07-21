const mongoose = require("mongoose");

// id, difficulty, Name, Description, exampleCases, numberOfSubmissions, numberOfSuccess, questionCode
const ProblemSchema = new mongoose.Schema({
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  example: [
    {
      type: Object,
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
      explaination: {
        type: String,
      },
    },
  ],
  noOfSubmissions: {
    type: Number,
    required: true,
    default: 0,
  },
  noOfSuccess: {
    type: Number,
    required: true,
    default: 0,
  },
  testCasesFile: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Problem", ProblemSchema);
