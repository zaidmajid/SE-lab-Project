import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,//white space remove krne k liye 
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);