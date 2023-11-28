import React, { useState, useEffect } from "react";
import OwnerMenu from '../../components/Layout/OwnerMenu'
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { saveLogs } from "../../components/utils/logs";
const Inventory = () => {
  const [products, setProducts] = useState([]);

  

  const getAllProducts2 = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-product`);
      setProducts(data.products);
    } catch (error) {
      saveLogs(error.message,"Owner/inventoryreport","Owner") 
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  }; 
  
  //lifecycle method
  useEffect(() => {
   
    getAllProducts2();
    
  }, []);
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
          <OwnerMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap" >
            {products?.map((p) => (
              <Link
                key={p._id}
                to={""}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "20rem"  , background:"lightgray"}}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/api/product-photo/${p._id}`}
                    className="card-img-top" style={{ width: "20rem" ,height: "10rem" }}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title"><b>Brand Name:</b>{p.Brandname}</h5>
                    <h5 className="card-text"><b>Price:</b>{p.price}</h5>
                    <h5 className="card-text"><b> Quantity:</b>{p.quantity}</h5>
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

export default Inventory;