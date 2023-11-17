import express from "express";
import {
  createSaleController,
  getSaleController,
  getSingleSaleController,
  updateSaleController,
} from "../controllers/saleController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Create sale
router.post("/create-sale", requireSignIn,createSaleController);

// Update sale
router.put("/update-sale/:id", requireSignIn,updateSaleController);

// Get sales
router.get("/get-sale", getSaleController);

// Get single sale
router.get("/get-sale/:id", getSingleSaleController);


export default router;
