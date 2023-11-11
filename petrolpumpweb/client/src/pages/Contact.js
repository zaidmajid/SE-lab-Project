import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";


const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus">
        <div className="col-md-6 contact-left">
          <img
            src="/images/images.jpeg"
            alt="contactus"
            style={{ width: "103%" }}
          />
        </div>
        <div className="col-md-6 contact-right">
          <h1 className="contact-heading">
            CONTACT US
          </h1>
          <p className="text-justify mt-2">
            Any query and info about services feel free to call anytime. We're
            available 24X7.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@petrolium12.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 0307-4660143
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll-free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
