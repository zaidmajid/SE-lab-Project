import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import ManagerMenu from '../../components/Layout/ManagerMenu'
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { saveLogs } from "../../components/utils/logs";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [Brandname, setBrandName] = useState("");
  const [Brandemail, setBrandEmail] = useState("");
  const [price, setPrice] = useState("");
  const [Saleprice, setSalePrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get( `${process.env.REACT_APP_API_URL}/api/get-product/${params.slug}` );
      setBrandName(data.product.Brandname);
      setId(data.product._id);
      setBrandEmail(data.product.Brandemail);
      setPrice(data.product.price);
      setSalePrice(data.product.Saleprice);

      setQuantity(data.product.quantity);
      setCategory(data.product.category._id);
    } catch (error) {
      saveLogs(error.message,"Manager/product/:slug","Manager") 
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      saveLogs(error.message,"Manager/product/:slug","Manager") 
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("Brandname", Brandname);
      productData.append("Brandemail", Brandemail);
      productData.append("price", price);
      productData.append("Saleprice", Saleprice);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(`${process.env.REACT_APP_API_URL}/api/update-product/${id}`,productData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/Manager/products");
      }
    } catch (error) {
      saveLogs(error.message,"Manager/product/:slug","Manager") 
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/delete-product/${id}`
      );
      toast.success("Product Deleted Succfully");
      navigate("/dashboard/Manager/products");
    } catch (error) {
      saveLogs(error.message,"Manager/product/:slug","Manager") 
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const dashboardStyle = {
    backgroundColor: "#001f3f", // Dark blue color
    color: "white",
    minHeight: "100vh", // Set a minimum height to cover the entire viewport
  };
  return (
    <Layout title={"Dashboard - Product"}>
       <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
        <div className="row">
          <div className="col-md-3">
            <ManagerMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
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
                value={category}
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
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/product-photo/${id}`}
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
                  onChange={(e) => setBrandEmail(e.target.value)}
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
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;