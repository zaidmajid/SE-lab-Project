import React from 'react'
import ManagerMenu from '../../components/Layout/ManagerMenu'
import Layout from "./../../components/Layout/Layout";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { saveLogs } from "../../components/utils/logs";
const { Option } = Select;

const CreateProduct = () => {
    const dashboardStyle = {
        backgroundColor: "#001f3f", // Dark blue color
        color: "white",
        minHeight: "100vh", // Set a minimum height to cover the entire viewport
      };

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [Brandname, setBrandName] = useState("");
  const [Brandemail, setBrandemail] = useState("");
  const [price, setPrice] = useState("");
  const [Saleprice, setSalePrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
    
  //get all category
   const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      saveLogs(error.message,"Manager/create-product","Manager") 
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);


  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("Brandname", Brandname);
      productData.append("Brandemail", Brandemail);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("Saleprice", Saleprice);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(`${process.env.REACT_APP_API_URL}/api/create-product`,productData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/Manager/products");
      }
    } catch (error) {
      saveLogs(error.message,"Manager/create-product","Manager") 
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout  title="Manager-Products">
          <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
          <div className="row">
        <div className="col-md-3">
            <ManagerMenu/>
        </div>
        <div className="col-md-9">
        <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={Brandname}
                  placeholder="write Brand name"
                  className="form-control"
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={Brandemail}
                  placeholder="write Brand Email"
                  className="form-control"
                  onChange={(e) => setBrandemail(e.target.value)}
                />
              </div>
             
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write Price per litre"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={Saleprice}
                  placeholder="write Sale Price per litre"
                  className="form-control"
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </div>
            
              <div className="mb-3">
                <button className="btn btn-primary mehroonish-red-button" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct;
