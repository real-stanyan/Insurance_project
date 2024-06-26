import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
