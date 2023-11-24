import React from 'react';
import Layout from './../../components/Layout/Layout';
import OwnerMenu from '../../components/Layout/OwnerMenu';
import { useAuth } from '../../context/auth';
import { saveLogs } from "../../components/utils/logs";

const OwnerProfile = () => {
  const { auth } = useAuth();

  const dashboardStyle = {
    backgroundColor: '#001f3f', // Dark blue color
    color: 'white',
    minHeight: '100vh', // Set a minimum height to cover the entire viewport
  };

  const cardStyle = {
    backgroundColor: '#001f3f', // Darker blue color for the card background
    color: 'white',
    padding: '20px',
    borderColor: 'beige',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.1)', // White shadow for better visibility
    margin: 'auto', // Center the card horizontally
    marginTop: '50px', // Add some top margin for spacing
    maxWidth: '500px', // Set a maximum width for the card
  };

  const headingStyle = {
    textAlign: 'center', // Center the heading
    marginBottom: '30px', // Add some bottom margin for spacing
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
        <div className="row">
          <div className="col-md-3">
            <OwnerMenu />
          </div>
          <div className="col-md-9">
            <h2 style={headingStyle}>Owner Profile</h2>
            <div className="d-flex justify-content-center">
              <img src="/images/actor.jpg" alt="Additional Image" style={{ width: "30%", height: "30%" }} />
            </div>
            <div className="card w-75 mx-auto" style={cardStyle}>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>
                Owner Name: {auth?.user?.name}
              </h3>
              <h3 style={{ color: 'white' }}>Owner Email: {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OwnerProfile;
