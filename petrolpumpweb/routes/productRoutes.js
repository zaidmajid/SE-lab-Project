import express from "express";
import {
 
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productPhotoController,
  updateProductController,
  updateQuantityProductController,
  toggleProductActiveController,
} from "../controllers/productController.js";
import emailController from "../controllers/emailController.js";
import {requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { saveLogs } from "../controllers/backendlogsController.js";

const router = express.Router();

//routes
router.post("/create-product",requireSignIn,formidable(),createProductController);
//update routes
router.put("/update-product/:pid",requireSignIn,formidable(),updateProductController);
router.put("/update-productquantity/:pid",requireSignIn,updateQuantityProductController);

//get products
router.get("/get-product", getProductController);
router.put("/product/toggleActive/:pid", toggleProductActiveController);
//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);


//product count
router.get("/product-count", productCountController);

// Send email route
router.post("/send-email", async (req, res) => {
 
  const { to, subject, text } = req.body;
  console.log(to);
  console.log(subject);
  console.log(text);

  try {
    await emailController.sendEmail(to, subject, text);
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    saveLogs(error.message,"/send-email","POST") 
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
});



export default router;