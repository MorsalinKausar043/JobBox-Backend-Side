const express = require("express");
const {
  getJobs,
  postJob,
  getJob,
  patchJob,
  deleteJob,
  applyJob,
  findApplyJob,
  query,
  reply,
} = require("../controller/jobsController");
const router = express.Router();


// get job
router.get("/", getJobs);
// post job
router.post("/", postJob);
// get single job data
router.get("/:_id", getJob);

// find the apply job
router.get("/applied-jobs/:email", findApplyJob);
// work on query part
router.patch("/query", query);
// work on query replay part
router.patch("/reply", reply);

// delete single job data
router.delete("/:_id", deleteJob);

// apply the job
router.patch("/apply", applyJob);
// update single job data
router.patch("/:email", patchJob);

module.exports = router;
