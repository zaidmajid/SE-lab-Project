import mongoose from "mongoose";

const backendlogsSchema = new mongoose.Schema({
  ErrorMessage: {
    type: String,
    required: true,
  },
  pageURL: {
    type: String,
    required: true,
  },
  request: {
    type: String,
    required: true,
  },
},
{ timestamps: true }
);

export default mongoose.model("backendlogs", backendlogsSchema);