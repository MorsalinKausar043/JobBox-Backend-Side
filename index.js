require("dotenv").config();
const express = require("express");
const app = new express();
const cors = require("cors");
const port = process.env.PORT || 5000;


// file dir and all routes
const user = require("./routes/userRoutes");
const { connectDB } = require("./config/connectDB");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", user);

// define database 
connectDB();

app.get("/", (req, res) =>
  res.status(201).json({ massage: "hello world this is express js!" })
);

// app listen
app.listen(port, () => console.log(`http://localhost:${port}/`));
