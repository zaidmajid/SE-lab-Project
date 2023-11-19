import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
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
    cnic: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        required: true,
      },
    salary: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);