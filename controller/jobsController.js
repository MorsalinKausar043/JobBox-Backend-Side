const { default: mongoose } = require("mongoose");
const job = require("../model/jobSchema.js");

// get all jobs
const getJobs = async (req, res) => {
  try {
    const result = await job.find({});
    res.status(201).json(result);
  } catch (error) {
    res.status(501).json({ massage: error });
  }
};
// post job
const postJob = async (req, res) => {
  try {
    const saveData = new job(req.body);
    const result = await saveData.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(501).json({ massage: error });
  }
};
// get single of for the email or companyName or _id
const getJob = async (req, res) => {
  try {
    const _id = req.params._id;
    const query = { _id };
    const result = await job.findOne(query);
    res.status(201).json(result);
  } catch (error) {
    res.status(501).json({ error: error.massage });
  }
};
// patch or update the job single data the email or companyName or _id
const patchJob = async (req, res) => {
  try {
    const email = req.params.email;
    const { _id } = await job.findOne({ email });
    const query = { _id: mongoose.Types.ObjectId(_id) };
    const updateDoc = { $set: req.body };
    const option = { upsert: true };
    const result = await job.findByIdAndUpdate(query, updateDoc, option);
    res.status(201).json(result);
  } catch (error) {
    res.status(501).json({ massage: error });
  }
};
// delete the job single data the email or companyName or _id
const deleteJob = async (req, res) => {
  try {
    const _id = req.params._id;
    const query = { _id: mongoose.Types.ObjectId(_id) };
    const result = await job.findByIdAndDelete(query);
    res.status(201).json(result);
  } catch (error) {
    res.status(501).json({ massage: error });
  }
};

// job apply
const applyJob = async (req, res) => {
  try {
    const { jobId, userId, email } = req.body;
    // find by specific job data
    const filter = { _id: jobId };
    // update job data
    const updateDoc = {
      $push: {
        applicants: { id: userId, email },
      },
    };

    const result = await job.updateOne(filter, updateDoc);
    res.status(201).json(result);
  } catch (error) {
    res.status(501).json({ massage: error });
  }
};

// find apply job
const findApplyJob = async (req, res) => {
  try {
    const email = req.params.email;
    const query = { applicants: { $elemMatch: { email: email } } };
    const result = await job.find(query);
    res.status(201).json({ status: true, data: result });
  } catch (error) {
    res.status(501).json({ massage: error.massage });
  }
};

// work on question part 
const query = async (req,res) =>{
  try {
    const {userId, jobId, email , question} = req.body;
    const filter = {_id: jobId};
    const updateDoc = {
      $push: {
        queries:{
          id:userId,
          email,
          question,
        }
      },
    };

    const result = await job.updateOne(filter,updateDoc);
    if (result?.acknowledged) {
      return res.status(201).send({ status: true, data: result });
    }

    res.status(501).send({ status: false });
    
  } catch (error) {
    res.status(501).json({ massage: error.massage });
  }
}
// work on question reply part 
const reply = async (req,res) =>{
  try {
    const { userId, reply } = req.body;
    const filter = {"queries.id":userId};
    const updateDoc = {
      $push: {
        "queries.$[user].replay" : reply
      },
    };
    const arrayFilter = {
      arrayFilters:[{"user.id":userId}],
    };
    const result = await job.updateOne(filter,updateDoc,arrayFilter);
    if (result?.acknowledged) {
      return res.status(201).send({ status: true, data: result });
    }

    res.status(501).send({ status: false });
  } catch (error) {
    res.status(501).json({ massage: error.massage });
  }
}
module.exports = {
  getJobs,
  postJob,
  getJob,
  patchJob,
  deleteJob,
  applyJob,
  findApplyJob,
  query,
  reply
};
