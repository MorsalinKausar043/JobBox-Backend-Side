const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connect Successfully!");
  } catch (error) {
    res.status(501).json({ error: error.massage });
  }
};

module.exports = {connectDB};
