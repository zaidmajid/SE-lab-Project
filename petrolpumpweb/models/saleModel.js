import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
  
   
    product: {
      type: mongoose.ObjectId,
      ref: "Products",
      required: true,
    },
    Salequantity: {
      type: Number,
      required: true,
    },
    date: {
        type: Date,
        default: Date.now,
      },

    
  },
  { timestamps: true }
);

export default mongoose.model("Sales", saleSchema);