import mongoose from "mongoose";

const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    link: {
      type: String,
    },
    uid: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("urls", urlSchema, "urls");
