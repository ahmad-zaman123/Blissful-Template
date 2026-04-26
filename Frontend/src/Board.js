import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Board(props) {
  return (
    <Container fluid style={{ padding: "0" }}>
      <Row
        className="d-flex align-items-center justify-content-center"
        // style={{ height: "580px", width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      >
        <Col className="d-flex justify-content-center p-0">
          <img
            src={props.src}
            alt="Banner"
            // style={{ height: "580px", width: "100%", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Board;
