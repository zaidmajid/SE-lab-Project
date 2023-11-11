import React from 'react';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <h2>Petrolium</h2>
        <p>Your trusted partner for fuel solutions. We fuel your journey with quality service and reliability. Explore our services and let us make your travels hassle-free.</p>
      </div>
      <div className="footer-section">
        <h4>Contact:</h4>
        <p><a href="mailto:petrolium12@gmail.com">petrolium12@gmail.com</a></p>
        <p>03074660143</p>
        <p>123 Main Street, Cityville</p> {/* Add the address here */}
      </div>
    </div>
  );
};

export default Footer;
