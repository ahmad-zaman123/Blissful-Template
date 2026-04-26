import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ShippingPolicy() {
  return (
    <Container style={{ marginTop: "30px" }}>
      <Row>
        <Col xs={1} md={4}></Col> {/* Left Empty Space */}
        <Col xs={10} md={4} className="text-center"> {/* Left Align */}
          <p style={{ fontWeight: "bold", fontSize: "3rem" }}>
            Shipping Policy
          </p>
          
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          At Blissful Beauty, we are dedicated to providing a seamless shopping experience from start to finish. Our shipping policy ensures that your orders are delivered promptly and securely. Please review the details of our shipping process below.
          </p>

          <br />

          
         
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Shipping Time Frame:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          You can expect delivery within 4 to 5 business days from the confirmation of your order.
          </p>

        

          <br />
          
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Shipping Fees:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          Flat-rate shipping fees are calculated during the checkout process.
          </p>

          <br />


          
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Shipping Destinations:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          We currently ship within Pakistan only.
          </p>
          
          <br />
         
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Order Tracking:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          You will receive tracking information via email once your order has been dispatched.
          </p>

          <br />

          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Shipping Address:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          Please ensure that your address details are accurate to avoid any delivery issues.
          </p>

          <br /><p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Shipping Delays:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          Please be aware that unforeseen circumstances may occasionally cause delays.
          </p>

          <br /><p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Contact Us:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          For any questions or assistance, please reach out to our customer support team at blissfulbeautypakistan@gmail.com
          </p>      

        
          <br /> <br /> <br />

        </Col>
        <Col xs={1} md={4}></Col> {/* Right Empty Space */}

     
      </Row>
    </Container>
  );
}

export default ShippingPolicy;