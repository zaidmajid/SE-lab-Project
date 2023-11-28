
import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { saveLogs } from "../../components/utils/logs";
import toast from "react-hot-toast";
import ManagerMenu from "../../components/Layout/ManagerMenu";
import { useAuth } from "../../context/auth";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ManagerDashboard = () => {
  const { auth } = useAuth();
  const [usersArray, setUserArray] = useState([]);
  const [products, setProducts] = useState(0);
  const [employeesArray, setEmployeeArray] = useState([]);
  const [categories, setCategories] = useState([]);
 
  const dashboardStyle = {
    backgroundColor: "#001f3f", // Dark blue color
    color: "white",
    minHeight: "100vh", // Set a minimum height to cover the entire viewport
  };

  const cardStyle = {
    backgroundColor: "#001f3f", // Darker blue color for the card background
    color: "white",
    padding: "20px",
    borderColor: "beige",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.1)", // White shadow for better visibility
  };

  const data = [
    { name: 'Users', count: usersArray },
    { name: 'Categories', count: categories },
    { name: 'Products', count: products },
    { name: 'Employees', count: employeesArray },
  ];
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
      setUserArray(data.length);
    } catch (err) {
      saveLogs(err.message,"Manager","Manager") 
      console.log("Error", err);
    }
  };
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-product`);
      setProducts(data.products.length);
    } catch (error) {
      saveLogs(error.message,"Manager","Manager") 
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
    // Get all categories from the server
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-category`);
  
        // Update state with the fetched categories if the request is successful
        if (data?.success) {
          setCategories(data?.category.length);
          console.log(data?.category.length)
        }
      } catch (error) {
        // Log error and display an error message
        saveLogs(error.message,"Manager","Manager") 
        console.log(error);
        toast.error("Something went wrong in getting category");
      }
    };
  const getEmployees = async () => {
    try {
      let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees`);
      setEmployeeArray(data.length);
     
    } catch (err) {
      saveLogs(err.message,"Manager","Manager") 
      console.log("Error", err);
    }
  };
  useEffect(() => {
    getAllProducts();
    getEmployees();
    getAllCategory();
    getUsers();
  }, []);

  return (
    <Layout title="Manager Dashboard">
      <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
        <div className="row">
          <div className="col-md-3">
            <ManagerMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75" style={cardStyle}>
              <h3 style={{ color: "white", marginBottom: "15px" }}>
                Manager Name : {auth?.user?.name}
              </h3>
              <h3 style={{ color: "white" }}>
                Manager Email : {auth?.user?.email}
              </h3>
            </div>
            <BarChart width={400} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#36A2EB" />
      </BarChart>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManagerDashboard;
