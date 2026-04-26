import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RefundPolicy() {
  return (
    <Container style={{ marginTop: "30px" }}>
      <Row>
        <Col xs={1} md={4}></Col> {/* Left Empty Space */}
        <Col xs={10} md={4} className="text-center"> {/* Left Align */}
          <p style={{ fontWeight: "bold", fontSize: "3rem" }}>
            Refund Policy
          </p>
          
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          At Blissful Beauty, we are committed to offering products of the highest quality. However, we recognize that there may be occasions where a return or exchange is necessary. Please review our policy below:
          </p>

          <br />

          
         
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Damaged or Incorrect Product Delivery:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          If you receive a damaged item or the wrong product, please reach out to our customer service team within 30 days of receiving your order. We will provide instructions on how to return the item and will either send a replacement or issue a full refund, including any applicable shipping costs.
          </p>

        

          <br />
          
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Return or Exchange Eligibility:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          Items must be returned in their original, unused condition.
          </p>

          <p style={{ fontSize: "0.9rem" }} className="text-start">
          The return or exchange request must be made within 30 days of receiving your order.
          </p>

          <p style={{ fontSize: "0.9rem" }} className="text-start">
          An original proof of purchase (order confirmation email) is required for all returns or exchanges.
          </p>

          <br />


          
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Return Process:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          Contact our customer service team at blissfulbeautypakistan@gmail.com to start the return or exchange process.
          </p>
          
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          Provide your order number, a description of the issue, and any relevant photos.
          </p>

          <p style={{ fontSize: "0.9rem" }} className="text-start">
          Our team will guide you through the return or exchange process.
          </p>

          <p style={{ fontSize: "0.9rem" }} className="text-start">
          If eligible, we will process the refund to the original payment method or send the replacement item, based on your preference
          </p>

          <p style={{ fontSize: "0.9rem" }} className="text-start">
          This whole process can take upto 15 business days for processing.
          </p>

          <br />
         
          <p style={{ fontWeight: "bold", fontSize: "1rem" }} className="text-start">Sale Items:</p>
          <p style={{ fontSize: "0.9rem" }} className="text-start">
          We do not offer refunds or exchanges on sale items.
          </p>

          <p style={{ fontSize: "0.9rem" }} className="text-start">
          Blissful Beauty reserves the right to refuse returns or exchanges that do not meet the outlined criteria. If you have any questions or concerns regarding our return and exchange policy, please contact our customer service team at blissfulbeautypakistan@gmail.com for assistance. 
          </p>

          <p style={{ fontSize: "0.9rem" }} className="text-start">
          Thank you for choosing Blissful Beauty!
          </p>

        
          <br /> <br /> <br />

        </Col>
        <Col xs={1} md={4}></Col> {/* Right Empty Space */}

     
      </Row>
    </Container>
  );
}

export default RefundPolicy;