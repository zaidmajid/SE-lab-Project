import React from 'react'
import Layout from "./../../components/Layout/Layout";
import OwnerMenu from '../../components/Layout/OwnerMenu';

const OwnerProfile = () => {
    const dashboardStyle = {
        backgroundColor: "#001f3f", // Dark blue color
        color: "white",
        minHeight: "100vh", // Set a minimum height to cover the entire viewport
      };
    
  return (
    <Layout  title="Manager-Products">
          <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
          <div className="row">
        <div className="col-md-3">
            <OwnerMenu/>
        </div>
        <div className="col-md-9">
        <h1>Manager Profile</h1>
        </div>
    </div>
          </div>
  

</Layout>
  )
}

export default OwnerProfile;
