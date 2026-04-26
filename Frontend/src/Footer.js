import React from "react";
import { Container, Row, Col,Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaSearch } from 'react-icons/fa';

const Footer = () => {
  return (
    <Container fluid className="py-4 bg-pink-300">

<Row className="w-100 d-flex justify-content-center align-items-center">
        {/* Black Box Wrapper */}
        <Col
          xs={12}
          md={11}
          lg={11}
          className="d-flex justify-content-center align-items-center flex-column"
          style={{  height: "250px" }}
        >
          {/* Title Section */}
          <Row className="w-100 d-flex justify-content-center align-items-center" style={{ height: "25px" }}>
            <Col xs={12} className="text-center">
              <p style={{ fontSize: "20px", color: "white",fontWeight:"bold" }}>GET LATEST STORIES</p>
            </Col>
          </Row>

          {/* Description Section */}
          <Row className="w-100 d-flex justify-content-center align-items-center flex-column" style={{ height: "50px" }}>
            <Col xs={12} className="text-center">
              <p style={{ fontSize: "15px", color: "white" }}>
              Share store details, promotions, or brand content with your customers.
              </p>
            </Col>
          </Row>

          {/* Buttons Section */}
          <Row className="w-100 d-flex justify-content-center align-items-center" style={{ height: "80px" }}>
            <Col xs="auto">
              <Button
                style={{
                  backgroundColor: "white",
                  height: "50x",
                  width: "400px",
                  color: "black",
                  border: "1px black solid",
                }}
              >
                Enter Your Email Address
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                style={{
                  backgroundColor: "black",
                  height: "38px",
                  width: "140px",
                  color: "white",
                  fontWeight : "bold",
                  fontSize : "15px",
                  border: "none",
                }}
              >
                SUBMIT
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-center">

      <Col xs={1} md={1} ></Col>

        {/* First Column */}
        <Col xs={12} md={2} className="text-center">
        <img 
            src="https://shopblissfulbeauty.com/cdn/shop/files/LOGO_420x.png?v=1732087575" 
            alt="Logo"
            className="h-[150px] w-auto"
          />
        </Col>

        {/* Second Column */}
        <Col xs={12} md={2} className="text-left" style={{ color: "white", lineHeight: "1.7" }}>
  <h6 className="fs-4 font-weight-bold">QUICK LINKS</h6>
  <ul className="list-unstyled">

  <Link
                className="mx-auto text-decoration-none"
                to="/"
                style={{ color: "white" }}
              >
                <li>Home</li>

              </Link>

    <li>Shop All</li>

    <Link
                className="mx-auto text-decoration-none"
                to="/ABOUTUS"
                style={{ color: "white" }}
              >
                <li>About Us</li>

              </Link>

              <Link
                className="mx-auto text-decoration-none"
                to="/CONTACTUS"
                style={{ color: "white" }}
              >
                <li>Contact us</li>

              </Link>
    

  </ul>
  <br />
</Col>

<Col xs={1} md={1} ></Col>


        {/* Third Column */}
        <Col xs={12} md={2} className="text-left" style={{ color: "white", lineHeight: "1.7" }}>
          <h5 className="fs-4 font-weight-bold">USER INFO</h5>
          
          <ul className="list-unstyled">

          <Link
                className="mx-auto text-decoration-none"
                to="/PrivacyPolicy"
                style={{ color: "white" }}
              >
                <li>Privacy Policy</li>

              </Link>

              <Link
                className="mx-auto text-decoration-none"
                to="/TermsOfService"
                style={{ color: "white" }}
              >
                <li>Terms of Service</li>

              </Link>

              <Link
                className="mx-auto text-decoration-none"
                to="/RefundPolicy"
                style={{ color: "white" }}
              >
                <li>Refund Policy</li>

              </Link>

              <Link
                className="mx-auto text-decoration-none"
                to="/ShippingPolicy"
                style={{ color: "white" }}
              >
                <li>Shipping Policy</li>

              </Link>
            
            
          
          </ul>
          <br/>
        </Col>

        <Col xs={1} md={1} ></Col>

        {/* Fourth Column */}
        <Col xs={12} md={2} className="text-left" style={{ color: "white", lineHeight: "1.7" }}>
          <h4 className="fs-4 font-weight-bold">CONTACT INFO</h4>
          
        
          <p>Lahore , Pakistan</p>
          <p>+92 333 1234567</p>
          <p>blissfulbeautypakistan@gmail.com</p>
          <br/>
          
        </Col>

        {/* Empty Column for spacing */}
        <Col xs={1} md={1} ></Col>
      </Row>

      <br />

      <Row>

      <Col xs={1} md={5} ></Col>

         <Col xs={3} md={2} className="flex items-center justify-center gap-3">
         <a href ="https://api.whatsapp.com/send/?phone=%2B923331371383&text&type=phone_number&app_absent=0"><FaWhatsapp className="text-xl cursor-pointer text-white" /></a>
          <a href ="https://www.facebook.com/blissfulbeautypakistan?mibextid=ZbWKwL"><FaFacebookF className="text-xl cursor-pointer text-white" /></a>
          <a href ="https://www.instagram.com/blissfulbeautypakistan/"><FaInstagram className="text-xl cursor-pointer text-white" /></a>

                </Col>

                <Col xs={1} md={5} ></Col>

      </Row>

      <br /> <br /> <br />

      <Row className="w-100 d-flex justify-content-center align-items-center flex-column" style={{ height: "20px" }}>
            <Col xs={12} className="text-center">
              <p style={{ fontSize: "15px", color: "white" }}>
              “Designed & Developed by Potato Logics”
              </p>
            </Col>
          </Row>

    </Container>
  );
};

export default Footer;