import React, { useState, useEffect } from "react";
import ManagerMenu from '../../components/Layout/ManagerMenu'
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts1 = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/get-product");
      console.log(data);
  
      // Use Promise.all to wait for all asynchronous operations to complete
      await Promise.all(
        data.products.map(async (product) => {
          if (product.quantity === 0) {
            const emailData = {
              to: product.Brandemail,
              subject: "Restock Request",
              text: `Dear Brand, the product ${product.Brandname} needs restocking. Please take necessary actions.`,
            };
  
            try {
              const emailResponse = await axios.post("http://localhost:8080/api/send-email", emailData);
  
              if (emailResponse.data.success) {
                toast.success(`Restock request email sent to ${product.Brandemail}`);
  
                // Call the API to update the quantity to 100
                const updateQuantityResponse = await axios.put(
                  `http://localhost:8080/api/update-productquantity/${product._id}`,
                  { quantity: 100 },
                );
  
                if (updateQuantityResponse.data.success) {
                  toast.success(`Quantity updated for ${product.Brandname}`);
                } else {
                  toast.error(`Failed to update quantity for ${product.Brandname}`);
                }
              } else {
                toast.error(`Failed to send restock request email for ${product.Brandname}`);
              }
            } catch (emailError) {
              console.error("Error sending email:", emailError);
              toast.error(`Failed to send restock request email for ${product.Brandname}`);
            }
          }
        })
      );
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  
  

  const getAllProducts2 = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  }; 
  
  //lifecycle method
  useEffect(() => {
    getAllProducts1();
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
          <ManagerMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap" >
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/Manager/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "20rem"  , background:"lightgray"}}>
                  <img
                    src={`http://localhost:8080/api/product-photo/${p._id}`}
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

export default Products;