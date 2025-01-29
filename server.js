import express, { urlencoded } from "express";
import mongoose from "mongoose";
import homeRouter from "./routes/home.js";
import bp from "body-parser";
//DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/bunty")
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// instance of app
const app = express();

app.use(express.static("assets")); // Serves static files from "assets" folder

//ejs
app.set("view engine", "ejs");

app.use(bp.urlencoded({ extended: true }));

//routes
app.use("/", homeRouter);

//listening on port
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
