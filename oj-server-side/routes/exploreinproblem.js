const express = require("express");
const router = express.Router();
const {
  allProblemsController,
  detailOfProblemController,
  verdictonController,
  leaderboardController,
} = require("../controller/explore");
const Job = require("../Database/model/job");
const problemMain = require("./problemMain");

router.get("/", allProblemsController); // to get all questions

router.get("/status", async (req, res) => {
  const jobId = req.query.id;
  console.log("status requested", jobId);

  if (jobId == undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }

  try {
    const job = await Job.findById(jobId);

    if (job === undefined) {
      return res.status(400).json({ success: false, error: "invalid job id" });
    }

    return res.status(200).json({ success: true, job });
  } catch (err) {
    return res.status(400).json({ success: false, error: `${err}` });
  }
});

router.get("/leaderboard", leaderboardController); // leaderboard
router.get("/:id", detailOfProblemController); // to get a particular question
router.post("/:id/verdict", verdictonController); // to post the solution

module.exports = router;
