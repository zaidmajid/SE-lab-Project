import saleModel from "../models/saleModel.js";
//import categoryModel from "../models/categoryModel.js";
import { saveLogs } from "./backendlogsController.js";
import fs from "fs";



export const createSaleController = async (req, res) => {
    try {
      const { product, Salequantity, date } = req.body;
      console.log(product);
      console.log(Salequantity);
      console.log(date);
      // Validation
    
           if (!product)
          return res.status(500).send({ error: "Product is Required" });
          if (!Salequantity)
          return res.status(500).send({ error: "Sale Quantity is Required" });
          if (!date)
          return res.status(500).send({ error: "Date is Required" });
      
  
      console.log(req.body);
      const sale = new saleModel({ product,Salequantity,date});
      await sale.save();
  
      res.status(201).send({
        success: true,
        message: "Sale Created Successfully",
        sale,
      });
    } catch (error) {
      saveLogs(error.message,"/create-sale","POST") 
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in creating sale",
      });
    }
  };
  
 
  export const getSaleController = async (req, res) => {
    try {
      const sales = await saleModel.find({}).populate("product").sort({ createdAt: -1 });
  
      res.status(200).send({
        success: true,
        countTotal: sales.length,
        message: "All Sales",
        sales,
      });
    } catch (error) {
      saveLogs(error.message,"/get-sale","GET") 
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in getting sales",
        error: error.message,
      });
    }
  };
  

  export const getSingleSaleController = async (req, res) => {
    try {
      const sale = await saleModel.findById(req.params.id).populate("product");
  
      res.status(200).send({
        success: true,
        message: "Single Sale Fetched",
        sale,
      });
    } catch (error) {
      saveLogs(error.message,"/get-sale/:id","GET") 
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while getting single sale",
        error,
      });
    }
  };
  
  export const updateSaleController = async (req, res) => {
    try {
      const { product, Salequantity, date } = req.body;
  
      // Validation
      if (!product)
      return res.status(500).send({ error: "Product is Required" });
      if (!Salequantity)
      return res.status(500).send({ error: "Sale Quantity is Required" });
      if (!date)
      return res.status(500).send({ error: "Date is Required" });
  
      console.log(product)
      const sale = await saleModel.findByIdAndUpdate(
        req.params.id,
        { product,Salequantity,date },
        { new: true }
      );
  
      res.status(201).send({
        success: true,
        message: "Sale Updated Successfully",
        sale,
      });
    } catch (error) {
      saveLogs(error.message,"/update-sale/:id","PUT") 
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in updating sale",
      });
    }
  };