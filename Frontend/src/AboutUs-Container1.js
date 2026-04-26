import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AboutUs_Container1() {
  return (
    <Container fluid style={{ padding: "0" }}>
      <Row
        className="d-flex align-items-center justify-content-center"
        style={{ height: "420px", width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      >
        <Col className="d-flex justify-content-center p-0">
          <img
            src="https://shopblissfulbeauty.com/cdn/shop/files/category_banner.jpg?v=1738903311&width=1770"
            alt="Banner"
            style={{ height: "420px", width: "100%", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs_Container1;
