import React from "react";
import ManagerMenu from "../../components/Layout/ManagerMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const ManagerDashboard = () => {
  const { auth } = useAuth();

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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManagerDashboard;
