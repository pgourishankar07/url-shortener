import express from "express";
import { Url } from "../models/url.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/url/:id", async (req, res) => {
  const id = req.params.id;

  const data = await Url.findOne({ id: id }).exec();

  if (data == null || data.url == null) {
    console.log("URL not Found");
    res.status(404).redirect("/");
  } else {
    res.status(300).redirect(data.url);
  }
});

router.post("/", async (req, res) => {
  const url = req.body.url;

  // Check if the URL already exists in the database
  let existingData = await Url.findOne({ url: url }).exec();

  if (existingData) {
    return res.render("copy", { url: existingData.id });
  }

  // If URL is new, generate a short ID and save it
  const id = nanoid(10);
  const newUrl = new Url({ id, url });

  await newUrl.save();

  res.render("copy", { url: id });
});

export default router;
