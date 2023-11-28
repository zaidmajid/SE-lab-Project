import React, { useState, useEffect } from "react";
import ManagerMenu from '../../components/Layout/ManagerMenu';
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { saveLogs } from "../../components/utils/logs";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-product`);
      setProducts(data.products);
    } catch (error) {
      saveLogs(error.message,"Manager/products","Manager") 
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  
  const toggleProductActive = async (id, currentActiveStatus) => {
    try {
      console.log(id);
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/product/toggleActive/${id}`);
      toast.success("Product Active Status Updated Successfully");
      getAllProducts();
    } catch (error) {
      saveLogs(error.message,"Manager/products","Manager") 
      toast.error("Error updating active status");
    }
  };

  const dashboardStyle = {
    backgroundColor: "#001f3f", // Dark blue color
    color: "white",
    minHeight: "100vh", // Set a minimum height to cover the entire viewport
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
        <div className="row dashboard">
          <div className="col-md-3">
            <ManagerMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                 <Link
                 key={p._id}
                 to={`/dashboard/Manager/product/${p.slug}`}
                 className="product-link"
               >
                <div key={p._id} className="card m-2" style={{ width: "20rem", background: "lightgray" }}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/api/product-photo/${p._id}`}
                    className="card-img-top"
                    style={{ width: "20rem", height: "10rem" }}
                    alt={p.Brandname}
                  />
                  <div className="card-body">
                    <h5 className="card-title"><b>Brand Name:</b>{p.Brandname}</h5>
                    <h5 className="card-text"><b>Price:</b>{p.price}</h5>
                    <h5 className="card-text"><b>Quantity:</b>{p.quantity}</h5>
                    <button
                      className={`btn ${p.active ? "btn-success" : "btn-danger"}`}
                      onClick={() => toggleProductActive(p._id, p.active)}
                    >
                      {p.active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
