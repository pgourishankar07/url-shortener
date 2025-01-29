import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  id: String,
  url: String,
});

export const Url = mongoose.model("url-shortener", urlSchema);
