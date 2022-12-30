const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connect Successfully!");
  } catch (error) {
    res.status(501).json({ error: error.massage });
  }
};

module.exports = {connectDB};
