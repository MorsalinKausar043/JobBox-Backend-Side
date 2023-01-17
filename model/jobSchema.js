const mongoose = require('mongoose');
const validator = require('validator');


const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalided Email!");
      }
    },
  },
  employmentType: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  experience: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  salaryRange: {
    type: String,
    required: true,
  },
  workLevel: {
    type: String,
    required: true,
  },
  requirements: {
    type: Array,
    required: true,
  },
  responsibilities: {
    type: Array,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  applicants:{
    type:Array
  },
  queries:{
    type:Array
  },
  date:{
    type:Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model("job",jobSchema);