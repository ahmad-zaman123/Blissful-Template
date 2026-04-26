import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function BundlesHome() {
  return (
    <Container style={{ marginTop: "30px" }}>
      {/* 🟢 First Row: Full Page Width, Pink Background */}

      <Row className="">
   
        {/* OUR BEST SELLERS Text (10 col) */}
        <Col xs={12} md={12} lg={12} style={{ backgroundColor: "#f9a8d4", fontWeight: "bold", fontSize: "2.5rem", textAlign: "center",color:"white" }}>
          BUNDLES
        </Col>
        
      </Row>
  

      {/* 🔵 Second Row: No Background */}
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80px" }}
      >
        <Col className="text-center">
          <h2 style={{ color: "#f9a8d4", fontWeight: "bold", fontSize: "1.3rem" }}>
            GET MORE, PAY LESS
          </h2>
        </Col>
      </Row>
      
    </Container>
  );
}

export default BundlesHome;
