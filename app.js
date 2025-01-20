import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import {faker} from "@faker-js/faker";

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));
dotenv.config();

mongoose
    .connect(process.env.MONGO_URI, {dbName: "caching"})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
