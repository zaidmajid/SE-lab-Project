import productModel from "../models/productModel.js";
//import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import slugify from "slugify";
import { saveLogs } from "./backendlogsController.js";
//import dotenv from "dotenv";
//dotenv.config();



export const createProductController = async (req, res) => {
  try {
    const { Brandname,Brandemail, price, category, quantity,Saleprice } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !Brandname:
        return res.status(500).send({ error: "Brand Name is Required" });
      case !Brandemail:
        return res.status(500).send({ error: "Brand Email is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !Saleprice:
        return res.status(500).send({ error: "Sale Price is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(Brandname) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    saveLogs(error.message,"/create-product","POST") 
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};
export const toggleProductActiveController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productModel.findById(pid);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.active = !product.active;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    saveLogs(error.message,"/product/toggleActive/:pid","PUT") 
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({active: true})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    saveLogs(error.message,"/get-product","GET") 
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    saveLogs(error.message,"/get-product/:slug","GET") 
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    saveLogs(error.message,"/product-photo/:pid","GET") 
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    saveLogs(error.message,"/delete-product/:pid","DELETE") 
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const { Brandname,Brandemail,  price, category, quantity,Saleprice } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
     case !Brandname:
        return res.status(500).send({ error: "Brand Name is Required" });
      case !Brandemail:
          return res.status(500).send({ error: "Brand Email is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !Saleprice:
            return res.status(500).send({ error: "Sale Price is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(Brandname) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    saveLogs(error.message,"/delete-product/:pid","DELETE") 
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};


// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    saveLogs(error.message,"/product-count","GET") 
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

export const updateQuantityProductController = async (req, res) => {
  try {
    console.log(req.params);
    const { pid } = req.params; 
    console.log(pid);
    const { quantity } = req.body;

    // Validation for quantity
    if (!quantity) {
      return res.status(500).send({ error: "Quantity is Required" });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      pid,
      { quantity },
      { new: true } 
    );

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Save the updated product
    await updatedProduct.save();

    res.status(201).send({
      success: true,
      message: "Product quantity Updated Successfully",
      updatedProduct,
    });
  } catch (error) {
    saveLogs(error.message,"/update-productquantity/:pid","PUT") 
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};