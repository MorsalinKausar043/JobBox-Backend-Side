const mongoose = require('mongoose');
const { Schema } = require("mongoose");
const validator = require('validator');

// user schema 
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email!");
      }
    },
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  postcode: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// user document 
const user = mongoose.model("user", userSchema);

module.exports = user;