import express from "express";
import { nanoid } from "nanoid";
import mongoose, { Mongoose } from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/bunty")
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const urlSchema = new mongoose.Schema({
  id: String,
  url: String,
});

const Url = mongoose.model("url-shortener", urlSchema);

const app = express();

app.get("/", async (req, res) => {
  const data = new Url();

  const id = nanoid(10);
  console.log(id);
  data.id = id;
  data.url = "https://mongoosejs.com/docs/guide.html";

  await data.save();
  res.send(`Generated ID: ${id}`);
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;

  const data = await Url.findOne({ id: id }).exec();
  if (data == null || data.url == null) {
    console.log("URL not Found");
    res.status(404).redirect("/");
  } else {
    res.status(300).redirect(data.url);
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
