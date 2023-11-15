import express from "express";
import {
 
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import {requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post("/create-product",requireSignIn,formidable(),createProductController);
//routes
router.put("/update-product/:pid",requireSignIn,formidable(),updateProductController);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);


//product count
router.get("/product-count", productCountController);





export default router;