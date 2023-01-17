require("dotenv").config();
const express = require("express");
const app = new express();
const cors = require("cors");
const port = process.env.PORT || 5000;


// file dir and all routes
const { connectDB } = require("./config/connectDB");
const user = require("./routes/userRoutes");
const job = require("./routes/jobRoutes");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// define data file 
app.use("/user", user);
app.use("/job", job);

// define database 
connectDB();

app.get("/", (req, res) =>
  res.status(201).json({ massage: "hello world this is express js!" })
);

// app listen
app.listen(port, () => console.log(`http://localhost:${port}/`));
