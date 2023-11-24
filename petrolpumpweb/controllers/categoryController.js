import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import { saveLogs } from "./backendlogsController.js";
import { categoryAudit } from "./categoryauditController.js";


export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
      // Category Insert Audit
      categoryAudit(category._id,"INSERT","-",category);
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    saveLogs(error.message,"/create-category","POST") 
    console.log(error);
    res.status(500).send({
      success: false,
      errro,
      message: "Errro in Category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const oldValue = await categoryModel.find({_id:id});
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    categoryAudit(id,"UPDATE",oldValue[0],category); 
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    saveLogs(error.message,"/update-category/:id","PUT") 
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all category
export const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel.find({ active: true});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    saveLogs(error.message,"/get-category","GET") 
    console.log(error);
    res.status(500).send({
      success: false,
      
      error,
      message: "Error while getting all categories",
    });
  }
};
export const toggleCategoryActiveController = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.active = !category.active;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    saveLogs(error.message,"/category/toggleActive/:id","PUT") 
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    saveLogs(error.message,"/single-category/:id","GET") 
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    const oldValue = await categoryModel.find({_id:id}); 
    await categoryModel.findByIdAndDelete(id);
    categoryAudit(id,"DELETE",oldValue[0],"-");
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    saveLogs(error.message,"/delete-category/:id","DELETE") 
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};