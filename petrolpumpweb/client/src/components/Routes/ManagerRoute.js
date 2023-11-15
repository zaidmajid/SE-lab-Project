import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import HomePage from "../../pages/HomePage";
import Dashboard from "../../pages/Owner/OwnerDashboard";
import { BiTrendingUp } from "react-icons/bi";


const ManagerRoute = () => {
    const [ok, setOk] = useState(false);
    const { auth, setAuth } = useAuth();
  
    useEffect(() => {
      const authCheck = async () => {
        try {
          const storedAuth = JSON.parse(localStorage.getItem("auth"));
  
          if (storedAuth?.token) {
            setAuth({
              user: storedAuth.user,
              token: storedAuth.token,
            });
  
            // Log headers before making the request
            const headers = { Authorization: storedAuth.token };
            console.log("Request Headers:", headers);
  
            // Make an authenticated request with the token
            const res = await axios.get("http://localhost:8080/api/user-auth", {
              headers,
            });
            console.log(res.data);
            if (res.data && res.data.ok) {
             
                setOk(true);
              } else {
                setOk(false);
              }
          } else {
            setOk(false);
          }
        } catch (error) {
          console.error("Error during authentication check:", error);
          setOk(false);
        }
      };
  
      if (auth?.token) {
        authCheck();
      }
    }, [auth?.token, setAuth]);
   
    return ok ? <Outlet /> : <Spinner />;
  };
  
  export default ManagerRoute;
  