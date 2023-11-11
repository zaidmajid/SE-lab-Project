import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Layout from '../components/Layout/Layout';

const HomePage = () => {
  return (
    <Layout title={"Home Page"}>
      <div className="row">
        {/* First Section: Full-width Carousel */}
        <div className="col-md-12 p-0" style={{ backgroundColor: "#001f3f" }}>
          <div id="aboutCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/png.png" className="d-block w-100" alt="About Us" style={{ height: "calc(100vh - 70px)" }} />
                <div className="carousel-caption text-left">
                  <h1 className="display-3 font-weight-bold text-white">Top Rated Company in the World!</h1>
                  <p className="font-weight-bold text-white">
                    Welcome to our Petrol Pump, where every drop counts towards a seamless journey. From quality fuels to unparalleled service, we're here to fuel your road trips and daily commutes alike.
                  </p>
                </div>
              </div>
              {/* Add more carousel items if needed */}
            </div>
          </div>
        </div>

        {/* Second Section: Buttons for Signup and Signin */}
        <div className="col-md-6" style={{ backgroundColor: " #001F3F" }}>
          {/* Text before buttons */}
          <div className="text-white p-4">
            <h2
              className="font-weight-bold"
              style={{
                fontSize: "2.5em",
                color: "#fff", // Text color
                fontWeight: "bold",
                padding: "10px",
              }}
            >
              Join Us!
            </h2>
            <p>
              Immerse yourself in the world of Petroleum Pump, where fueling your vehicle is not just a pitstop, but an experience. Our commitment to excellence ensures that your journeys are powered with reliability and efficiency.
            </p>
            <p>
              At Petroleum Pump, we go beyond delivering fuel; we deliver peace of mind on the road. Join us in the pursuit of cleaner, more efficient, and trustworthy fueling services.
            </p>
            {/* Buttons for Signup and Signin */}
            <div className="mt-3">
              <Link to="/register">
                <button className="btn btn-danger btn-lg rounded-pill mr-4" style={{ backgroundColor: "#800000" }}>Register</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-maroonish btn-lg text-white rounded-pill" style={{ backgroundColor: "#800000" }}>Login</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Two Images on the right side (each taking half width) */}
        <div className="col-md-6 p-0">
          <div className="row">
            {/* First Image */}
            <div className="col-md-12 p-0">
              <img src="/images/pp.jpg" alt="Additional Image" style={{ width: "100%", height: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
