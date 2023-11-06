import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
const app = express();
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("MERN bookstore");
});
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Current port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
