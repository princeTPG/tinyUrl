import mongoose from "mongoose";
import { SHORT_LINK_EXPIRE_DURATION } from '../../config';

const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    link: {
      type: String,
    },
    uid: {
      type: String,
      unique: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("urls", urlSchema, "urls");
