import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Request Payload:", { email, answer, newPassword });
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      console.log(res);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div
        className="dark-navy-background form-container"
        style={{ minHeight: "90vh", paddingTop: "60px" }}
      >
        <div
          className="silver-container"
          style={{ backgroundColor: "#ccc", padding: "20px", borderRadius: "8px" }}
        >
          <form onSubmit={handleSubmit}>
            <h4 className="black-title">RESET PASSWORD </h4>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Your Email"
                required
                autoFocus
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                placeholder="Enter Your Pet Name"
                required
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Your Password"
                required
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mehroonish-red-button"
              style={{
                color: "#fff",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              RESET
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;
