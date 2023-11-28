import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
        name,
        email,
        password,
        role,
        answer,
      });
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
    <Layout title="Register - Petrolium ">
      <div className="dark-navy-background form-container" style={{ minHeight: "90vh", paddingTop: "60px" }}>
        <div className="silver-container">
          <form onSubmit={handleSubmit}>
            <h4 className="black-title">REGISTER </h4>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter Your Name"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Your Email "
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={role}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/[^01]/g, ''); // Only allow 0 or 1
                  setRole(inputVal);
                }}
                className="form-control"
                placeholder="Enter Your Role (0 or 1)"
                pattern="[01]"
                title="Enter 0 or 1"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                placeholder="Your Pet Name"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mehroonish-red-button">
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
