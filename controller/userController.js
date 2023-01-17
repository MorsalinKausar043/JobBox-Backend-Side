const mongoose = require("mongoose");
const user = require("../model/userSchema");

// all users data
const usersApi = async (req, res) => {
  try {
    const userApi = await user.find({});
    res.status(201).json(userApi);
  } catch (error) {
    res.status(501).json({ error: error.massage });
  }
};

// single person data
const userApi = async (req, res) => {
  try {
    const _id = req.params._id;
    const query = { _id };
    const singleApi = await user.findOne(query);
    res.status(201).json(singleApi);
  } catch (error) {
    res.status(501).json({ error: error.massage });
  }
};
// single person data with email
const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const query = { email };
    const result = await user.findOne(query);
    if (result?.email) {
      res.status(201).json({ status: true, data: result });
    } else {
      res.status(201).json({ status: false });
    }
  } catch (error) {
    res.status(501).json({ error: error.massage });
  }
};

// post user Data
const postUser = async (req, res) => {
  try {
    const userData = new user(req.body);
    const result = await userData.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(501).json({ error: error.massage });
    console.log(error);
  }
};

// patch user data
const patchUser = async (req, res) => {
  try {
    const _id = req.params._id;
    const query = { _id: mongoose.Types.ObjectId(_id) };
    const updateDoc = { $set: req.body };
    const option = { upsert: true };
    const result = await user.findByIdAndUpdate(query, updateDoc, option);
    res.status(201).json(result);
  } catch (error) {
    res.status(501).json({ error: error.massage });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const _id = req.params._id;
    const query = { _id: mongoose.Types.ObjectId(_id) };
    const result = await user.findOneAndDelete(query);
    res.status(201).json(result);
  } catch (error) {
    res.status(501).json({ error: error.massage });
  }
};

module.exports = {
  usersApi,
  userApi,
  getUserByEmail,
  postUser,
  patchUser,
  deleteUser,
};
