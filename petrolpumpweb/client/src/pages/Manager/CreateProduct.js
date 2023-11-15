import React from 'react'
import ManagerMenu from '../../components/Layout/ManagerMenu'
import Layout from "./../../components/Layout/Layout";

const CreateProduct = () => {
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
            <ManagerMenu/>
        </div>
        <div className="col-md-9">
        <h1>Create Product</h1>
        </div>
    </div>
          </div>
  

</Layout>
  )
}

export default CreateProduct
