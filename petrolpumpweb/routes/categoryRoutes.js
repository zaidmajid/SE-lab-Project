import express from "express";
import { requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
  toggleCategoryActiveController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post("/create-category", requireSignIn, createCategoryController);

//update category
router.put("/update-category/:id", requireSignIn, updateCategoryController);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:id", singleCategoryController);

//delete category
router.delete("/delete-category/:id",requireSignIn, deleteCategoryCOntroller);
router.put("/category/toggleActive/:id", toggleCategoryActiveController);

export default router;