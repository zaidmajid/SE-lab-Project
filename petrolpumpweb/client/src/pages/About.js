import React from "react";
import Layout from "./../components/Layout/Layout";


const About = () => {
  return (
    <Layout title={"About us - Petroleum Pump"} style={{ backgroundColor: "black" }}>
      <div className="row">
        {/* First Section: Full-width Carousel */}
        <div className="col-md-12 p-0" style={{ backgroundColor: "#001f3f" }}>
          <div id="aboutCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/png.png" className="d-block w-100" alt="About Us" style={{ height: "calc(100vh - 70px)" }} />
                <div className="carousel-caption text-left">
                  <h1 className="display-3 font-weight-bold text-white">About Us</h1>
                </div>
              </div>
              {/* Add more carousel items if needed */}
            </div>
          </div>
        </div>

        {/* Second Section: Text on the left, Images on the right */}
        <div className="col-md-6">
          {/* Text on the left side */}
          <div className="text-white p-4">
            {/* Welcome to Petrolium Heading */}
            <h2
              className="font-weight-bold"
              style={{
                fontSize: "2.5em", // Increased font size
                color: "#001f3f", // Dark navy blue
                fontWeight: "bold", // Bold font weight
                padding: "10px",
              }}
            >
              Welcome to Petroleum
            </h2>
            {/* About Us Paragraph */}
            <p className="text-justify mt-2" style={{ padding:"20px", color: "white" ,backgroundColor:"#001f3f"}}>
              At Petroleum Pump, we take pride in delivering high-quality fuels and exceptional service to our valued customers. With a commitment to excellence, we ensure that your vehicles are fueled with precision and care. Our state-of-the-art facilities and trained staff guarantee a seamless experience every time you visit us.
              <br /><br />
              We understand the importance of reliability and efficiency in the fast-paced world, and that's why we strive to provide top-notch fueling solutions. Whether you are a commuter, a business owner, or a long-haul traveler, Petroleum Pump is your trusted partner on the road. Join us in the journey towards cleaner, more efficient, and reliable fueling services.
            </p>
          </div>
        </div>

        {/* Two Images on the right side (each taking half width) */}
        <div className="col-md-6 p-0">
          <div className="row">
            {/* First Image */}
            <div className="col-md-12 p-0">
              <img src="/images/pp.jpg" alt="Additional Image" style={{ width: "100%" ,height:"110%"}} />
            </div>
           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
